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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("../../entities/invoice.entity");
let InvoiceService = class InvoiceService {
    constructor(invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    // Create a new invoice
    async createInvoice(createInvoiceInput) {
        try {
            // Check if invoice number already exists
            const existingInvoice = await this.invoiceRepository.findOne({
                where: { invoiceNumber: createInvoiceInput.invoiceNumber },
            });
            if (existingInvoice) {
                throw new common_1.BadRequestException('Invoice number already exists');
            }
            const newInvoice = this.invoiceRepository.create(createInvoiceInput);
            return this.invoiceRepository.save(newInvoice);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    // Find all invoices
    async findAll() {
        return this.invoiceRepository.find({
            relations: ['customer', 'job'],
        });
    }
    // Find invoices by status
    async findByStatus(status) {
        return this.invoiceRepository.find({
            where: { status },
            relations: ['customer', 'job'],
        });
    }
    // Find overdue invoices
    async findOverdue() {
        const today = new Date();
        return this.invoiceRepository.find({
            where: {
                status: invoice_entity_1.InvoiceStatus.PENDING,
                dueDate: (0, typeorm_2.LessThan)(today),
            },
            relations: ['customer', 'job'],
        });
    }
    // Find invoices for a specific month
    async findByMonth(year, month) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        return this.invoiceRepository.find({
            where: {
                issueDate: (0, typeorm_2.Between)(startDate, endDate),
            },
            relations: ['customer', 'job'],
        });
    }
    // Find invoices by customer
    async findByCustomer(customerId) {
        return this.invoiceRepository.find({
            where: { customerId },
            relations: ['customer', 'job'],
        });
    }
    // Find invoices by job
    async findByJob(jobId) {
        return this.invoiceRepository.find({
            where: { jobId },
            relations: ['customer', 'job'],
        });
    }
    // Calculate total outstanding amount
    async calculateTotalOutstanding() {
        const pendingInvoices = await this.invoiceRepository.find({
            where: { status: invoice_entity_1.InvoiceStatus.PENDING },
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
                status: invoice_entity_1.InvoiceStatus.PAID,
                issueDate: (0, typeorm_2.Between)(startOfMonth, endOfMonth),
            },
        });
        return paidInvoices.reduce((total, invoice) => total + Number(invoice.amount), 0);
    }
    // Find a invoice by ID
    async findOne(id) {
        const invoice = await this.invoiceRepository.findOne({
            where: { id },
            relations: ['customer', 'job'],
        });
        if (!invoice) {
            throw new common_1.NotFoundException('Invoice not found');
        }
        return invoice;
    }
    // Update an invoice
    async updateInvoice(id, updateInvoiceInput) {
        try {
            const invoice = await this.findOne(id);
            // If invoice number is being updated, check if it's already in use
            if (updateInvoiceInput.invoiceNumber && updateInvoiceInput.invoiceNumber !== invoice.invoiceNumber) {
                const existingInvoice = await this.invoiceRepository.findOne({
                    where: { invoiceNumber: updateInvoiceInput.invoiceNumber },
                });
                if (existingInvoice && existingInvoice.id !== id) {
                    throw new common_1.BadRequestException('Invoice number already exists');
                }
            }
            Object.assign(invoice, updateInvoiceInput);
            return this.invoiceRepository.save(invoice);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    // Update invoice status
    async updateStatus(id, status) {
        const invoice = await this.findOne(id);
        invoice.status = status;
        return this.invoiceRepository.save(invoice);
    }
    // Mark invoice as synced with QuickBooks
    async markAsSynced(id) {
        const invoice = await this.findOne(id);
        invoice.quickbooksSynced = true;
        return this.invoiceRepository.save(invoice);
    }
    // Delete an invoice
    async deleteInvoice(id) {
        try {
            const invoice = await this.findOne(id);
            await this.invoiceRepository.remove(invoice);
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InvoiceService);
//# sourceMappingURL=invoices.service.js.map