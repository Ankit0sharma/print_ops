import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, Between, In } from 'typeorm';
import { Invoice, InvoiceItem, BillingAddress } from '../../entities/invoice.entity';
import { CreateInvoiceInput, InvoiceItemInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { InvoiceFilterInput } from './dto/invoice-filter.input';
import { InvoicePaginationOutput } from './dto/invoice-pagination.output';
import { InvoiceStatsOutput } from './dto/invoice-stats.output';
import { InvoiceStatus, InvoiceSortField, SortDirection } from '../../common/enums/invoice.enum';
import { Customer } from '../../entities/customer.entity';
import { Job } from '../../entities/job.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  // Create a new invoice
  async createInvoice(createInvoiceInput: CreateInvoiceInput): Promise<Invoice> {
    // First, verify that the customer exists
    const customer = await this.customerRepository.findOne({
      where: { id: createInvoiceInput.customerId }
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${createInvoiceInput.customerId} not found`);
    }

    // If jobId is provided, verify that the job exists and belongs to the customer
    if (createInvoiceInput.jobId) {
      const job = await this.jobRepository.findOne({
        where: { 
          id: createInvoiceInput.jobId,
          customerId: createInvoiceInput.customerId
        }
      });

      if (!job) {
        throw new NotFoundException(`Job with ID ${createInvoiceInput.jobId} not found or does not belong to the customer`);
      }
    }

    const items = createInvoiceInput.items.map(item => ({
      ...item,
      amount: item.quantity * item.unitPrice,
    }));

    const subtotal = this.calculateSubtotal(items);
    const taxRate = createInvoiceInput.taxRate || 0;
    const total = subtotal * (1 + taxRate / 100);

    const invoice = this.invoiceRepository.create({
      ...createInvoiceInput,
      items,
      subtotal,
      total,
      amount: total,
      status: createInvoiceInput.status || InvoiceStatus.DRAFT,
      issueDate: createInvoiceInput.date,
    });

    const savedInvoice = await this.invoiceRepository.save(invoice);

    // Reload the invoice with all relations
    return this.invoiceRepository.findOne({
      where: { id: savedInvoice.id },
      relations: ['customer', 'job']
    });
  }

  // Find all invoices
  async findInvoices(filterInput: InvoiceFilterInput): Promise<InvoicePaginationOutput> {
    const { 
      page = 1, 
      limit = 10, 
      status,
      startDate,
      endDate,
      customerId,
      jobId,
      quickbooksSynced,
      search,
      sortField = InvoiceSortField.DATE, 
      sortDirection = SortDirection.DESC 
    } = filterInput;

    const skip = (page - 1) * limit;
    
    const queryBuilder = this.invoiceRepository
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.customer', 'customer')
      .leftJoinAndSelect('invoice.job', 'job');

    // Apply filters
    if (status) {
      queryBuilder.andWhere('invoice.status = :status', { status });
    }
    
    if (startDate && endDate) {
      queryBuilder.andWhere('invoice.issueDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }
    
    if (customerId) {
      queryBuilder.andWhere('invoice.customerId = :customerId', { customerId });
    }
    
    if (jobId) {
      queryBuilder.andWhere('invoice.jobId = :jobId', { jobId });
    }
    
    if (quickbooksSynced !== undefined) {
      queryBuilder.andWhere('invoice.quickbooksSynced = :quickbooksSynced', { quickbooksSynced });
    }
    
    if (search) {
      queryBuilder.andWhere('invoice.invoiceNumber ILIKE :search', { search: `%${search}%` });
    }
    
    // Apply sorting
    const sortColumn = this.getSortColumn(sortField);
    queryBuilder.orderBy(sortColumn, sortDirection);

    // Get total count
    const total = await queryBuilder.getCount();

    // Apply pagination
    queryBuilder.skip(skip).take(limit);

    // Get invoices
    const invoices = await queryBuilder.getMany();

    return {
      items: invoices,
      total,
      page,
      limit,
      hasMore: total > skip + limit,
    };
  }

  private calculateSubtotal(items: InvoiceItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }

  private getSortColumn(sortField: InvoiceSortField): string {
    switch (sortField) {
      case InvoiceSortField.DATE:
        return 'invoice.issueDate';
      case InvoiceSortField.DUE_DATE:
        return 'invoice.dueDate';
      case InvoiceSortField.INVOICE_NUMBER:
        return 'invoice.invoiceNumber';
      case InvoiceSortField.AMOUNT:
        return 'invoice.amount';
      case InvoiceSortField.STATUS:
        return 'invoice.status';
      default:
        return 'invoice.issueDate';
    }
  }

  // Find a invoice by ID
  async findInvoice(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['customer', 'job'],
    });
    
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    
    return invoice;
  }

  // Update an invoice
  async updateInvoice(id: string, updateInvoiceInput: UpdateInvoiceInput): Promise<Invoice> {
    const invoice = await this.findInvoice(id);
    
    const updates: Partial<Invoice> = {};
    
    // Copy all fields except items and billingAddress
    Object.keys(updateInvoiceInput).forEach(key => {
      if (key !== 'items' && key !== 'billingAddress') {
        updates[key] = updateInvoiceInput[key];
      }
    });

    // Handle items update
    if (updateInvoiceInput.items) {
      updates.items = updateInvoiceInput.items.map(item => ({
        ...item,
        amount: item.quantity * item.unitPrice,
      }));
      const subtotal = this.calculateSubtotal(updates.items);
      const taxRate = updates.taxRate || invoice.taxRate || 0;
      const total = subtotal * (1 + taxRate / 100);
      
      updates.subtotal = subtotal;
      updates.total = total;
      updates.amount = total;
    }

    // Handle billing address update
    if (updateInvoiceInput.billingAddress) {
      const { street, city, state, zip, country } = updateInvoiceInput.billingAddress;
      if (street && city && state && zip && country) {
        updates.billingAddress = updateInvoiceInput.billingAddress as BillingAddress;
      }
    }

    Object.assign(invoice, updates);
    return this.invoiceRepository.save(invoice);
  }

  // Update invoice status
  async updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<Invoice> {
    const invoice = await this.findInvoice(id);
    invoice.status = status;
    return this.invoiceRepository.save(invoice);
  }

  // Mark invoice as synced with QuickBooks
  async markInvoiceAsSynced(id: string): Promise<Invoice> {
    const invoice = await this.findInvoice(id);
    invoice.quickbooksSynced = true;
    return this.invoiceRepository.save(invoice);
  }

  // Sync multiple invoices with QuickBooks
  async syncMultipleInvoices(ids: string[]): Promise<boolean> {
    try {
      await this.invoiceRepository.update(
        { id: In(ids) },
        { quickbooksSynced: true }
      );
      return true;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Delete an invoice
  async deleteInvoice(id: string): Promise<boolean> {
    try {
      const invoice = await this.findInvoice(id);
      await this.invoiceRepository.remove(invoice);
      return true;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Find invoices by status
  async findInvoicesByStatus(status: InvoiceStatus): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      where: { status },
      relations: ['customer', 'job'],
      order: { issueDate: 'DESC' },
    });
  }

  // Find overdue invoices
  async findOverdueInvoices(): Promise<Invoice[]> {
    const today = new Date();
    
    return this.invoiceRepository.find({
      where: {
        status: InvoiceStatus.PENDING,
        dueDate: LessThan(today),
      },
      relations: ['customer', 'job'],
      order: { dueDate: 'ASC' },
    });
  }

  // Find invoices for a specific month
  async findInvoicesByMonth(year: number, month: number): Promise<Invoice[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    return this.invoiceRepository.find({
      where: {
        issueDate: Between(startDate, endDate),
      },
      relations: ['customer', 'job'],
      order: { issueDate: 'DESC' },
    });
  }

  // Find invoices by customer
  async findInvoicesByCustomer(customerId: string): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      where: { customerId },
      relations: ['customer', 'job'],
      order: { issueDate: 'DESC' },
    });
  }

  // Find invoices by job
  async findInvoicesByJob(jobId: string): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      where: { jobId },
      relations: ['customer', 'job'],
      order: { issueDate: 'DESC' },
    });
  }

  // Calculate total outstanding amount
  async calculateTotalOutstanding(): Promise<number> {
    const pendingInvoices = await this.invoiceRepository.find({
      where: { status: InvoiceStatus.PENDING },
    });
    
    return pendingInvoices.reduce((total, invoice) => total + Number(invoice.amount), 0);
  }

  // Calculate total paid this month
  async calculateTotalPaidThisMonth(): Promise<number> {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const paidInvoices = await this.invoiceRepository.find({
      where: {
        status: InvoiceStatus.PAID,
        issueDate: Between(startOfMonth, endOfMonth),
      },
    });
    
    return paidInvoices.reduce((total, invoice) => total + Number(invoice.amount), 0);
  }

  // Get invoice statistics for dashboard
  async getStats(): Promise<InvoiceStatsOutput> {
    const [totalCount, paidCount, pendingCount, overdueCount] = await Promise.all([
      this.invoiceRepository.count(),
      this.invoiceRepository.count({ where: { status: InvoiceStatus.PAID } }),
      this.invoiceRepository.count({ where: { status: InvoiceStatus.PENDING } }),
      this.invoiceRepository.count({ where: { status: InvoiceStatus.OVERDUE } }),
    ]);

    return {
      totalCount,
      paidCount,
      pendingCount,
      overdueCount,
    };
  }
}
