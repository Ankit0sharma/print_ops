"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("../../entities/invoice.entity");
const invoice_enum_1 = require("../../common/enums/invoice.enum");
const customer_entity_1 = require("../../entities/customer.entity");
const job_entity_1 = require("../../entities/job.entity");
let InvoicesService = class InvoicesService {
    constructor(invoiceRepository, customerRepository, jobRepository) {
        this.invoiceRepository = invoiceRepository;
        this.customerRepository = customerRepository;
        this.jobRepository = jobRepository;
    }
    // Create a new invoice
    async createInvoice(createInvoiceInput) {
        // First, verify that the customer exists
        const customer = await this.customerRepository.findOne({
            where: { id: createInvoiceInput.customerId }
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${createInvoiceInput.customerId} not found`);
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
                throw new common_1.NotFoundException(`Job with ID ${createInvoiceInput.jobId} not found or does not belong to the customer`);
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
            status: createInvoiceInput.status || invoice_enum_1.InvoiceStatus.DRAFT,
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
    async findInvoices(filterInput) {
        const { page = 1, limit = 10, status, startDate, endDate, customerId, jobId, quickbooksSynced, search, sortField = invoice_enum_1.InvoiceSortField.DATE, sortDirection = invoice_enum_1.SortDirection.DESC } = filterInput;
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
    calculateSubtotal(items) {
        return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    }
    getSortColumn(sortField) {
        switch (sortField) {
            case invoice_enum_1.InvoiceSortField.DATE:
                return 'invoice.issueDate';
            case invoice_enum_1.InvoiceSortField.DUE_DATE:
                return 'invoice.dueDate';
            case invoice_enum_1.InvoiceSortField.INVOICE_NUMBER:
                return 'invoice.invoiceNumber';
            case invoice_enum_1.InvoiceSortField.AMOUNT:
                return 'invoice.amount';
            case invoice_enum_1.InvoiceSortField.STATUS:
                return 'invoice.status';
            default:
                return 'invoice.issueDate';
        }
    }
    // Find a invoice by ID
    async findInvoice(id) {
        const invoice = await this.invoiceRepository.findOne({
            where: { id },
            relations: ['customer', 'job'],
        });
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice with ID ${id} not found`);
        }
        return invoice;
    }
    // Update an invoice
    async updateInvoice(id, updateInvoiceInput) {
        const invoice = await this.findInvoice(id);
        const updates = {};
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
                updates.billingAddress = updateInvoiceInput.billingAddress;
            }
        }
        Object.assign(invoice, updates);
        return this.invoiceRepository.save(invoice);
    }
    // Update invoice status
    async updateInvoiceStatus(id, status) {
        const invoice = await this.findInvoice(id);
        invoice.status = status;
        return this.invoiceRepository.save(invoice);
    }
    // Mark invoice as synced with QuickBooks
    async markInvoiceAsSynced(id) {
        const invoice = await this.findInvoice(id);
        invoice.quickbooksSynced = true;
        return this.invoiceRepository.save(invoice);
    }
    // Sync multiple invoices with QuickBooks
    async syncMultipleInvoices(ids) {
        try {
            await this.invoiceRepository.update({ id: (0, typeorm_2.In)(ids) }, { quickbooksSynced: true });
            return true;
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    // Delete an invoice
    async deleteInvoice(id) {
        try {
            const invoice = await this.findInvoice(id);
            await this.invoiceRepository.remove(invoice);
            return true;
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    // Find invoices by status
    async findInvoicesByStatus(status) {
        return this.invoiceRepository.find({
            where: { status },
            relations: ['customer', 'job'],
            order: { issueDate: 'DESC' },
        });
    }
    // Find overdue invoices
    async findOverdueInvoices() {
        const today = new Date();
        return this.invoiceRepository.find({
            where: {
                status: invoice_enum_1.InvoiceStatus.PENDING,
                dueDate: (0, typeorm_2.LessThan)(today),
            },
            relations: ['customer', 'job'],
            order: { dueDate: 'ASC' },
        });
    }
    // Find invoices for a specific month
    async findInvoicesByMonth(year, month) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        return this.invoiceRepository.find({
            where: {
                issueDate: (0, typeorm_2.Between)(startDate, endDate),
            },
            relations: ['customer', 'job'],
            order: { issueDate: 'DESC' },
        });
    }
    // Find invoices by customer
    async findInvoicesByCustomer(customerId) {
        return this.invoiceRepository.find({
            where: { customerId },
            relations: ['customer', 'job'],
            order: { issueDate: 'DESC' },
        });
    }
    // Find invoices by job
    async findInvoicesByJob(jobId) {
        return this.invoiceRepository.find({
            where: { jobId },
            relations: ['customer', 'job'],
            order: { issueDate: 'DESC' },
        });
    }
    // Calculate total outstanding amount
    async calculateTotalOutstanding() {
        const pendingInvoices = await this.invoiceRepository.find({
            where: { status: invoice_enum_1.InvoiceStatus.PENDING },
        });
        return pendingInvoices.reduce((total, invoice) => total + Number(invoice.amount), 0);
    }
    // Calculate total paid this month
    async calculateTotalPaidThisMonth() {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const paidInvoices = await this.invoiceRepository.find({
            where: {
                status: invoice_enum_1.InvoiceStatus.PAID,
                issueDate: (0, typeorm_2.Between)(startOfMonth, endOfMonth),
            },
        });
        return paidInvoices.reduce((total, invoice) => total + Number(invoice.amount), 0);
    }
    // Get invoice statistics for dashboard
    async getStats() {
        const [totalCount, paidCount, pendingCount, overdueCount] = await Promise.all([
            this.invoiceRepository.count(),
            this.invoiceRepository.count({ where: { status: invoice_enum_1.InvoiceStatus.PAID } }),
            this.invoiceRepository.count({ where: { status: invoice_enum_1.InvoiceStatus.PENDING } }),
            this.invoiceRepository.count({ where: { status: invoice_enum_1.InvoiceStatus.OVERDUE } }),
        ]);
        return {
            totalCount,
            paidCount,
            pendingCount,
            overdueCount,
        };
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(2, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map