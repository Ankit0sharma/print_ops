
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum CustomerType {
    CORPORATE = "CORPORATE",
    SMALL_BUSINESS = "SMALL_BUSINESS"
}

export enum EventType {
    DEADLINE = "DEADLINE",
    INSTALLATION = "INSTALLATION",
    MEETING = "MEETING",
    REMINDER = "REMINDER"
}

export enum InvoiceStatus {
    DRAFT = "DRAFT",
    OVERDUE = "OVERDUE",
    PAID = "PAID",
    PENDING = "PENDING"
}

export enum JobPriority {
    HIGH = "HIGH",
    NORMAL = "NORMAL",
    URGENT = "URGENT"
}

export enum JobStatus {
    APPROVAL = "APPROVAL",
    COMPLETED = "COMPLETED",
    DESIGN = "DESIGN",
    PRINT = "PRINT",
    PRODUCTION = "PRODUCTION"
}

export enum MaterialCategory {
    SUBSTRATE = "SUBSTRATE",
    VINYL = "VINYL"
}

export enum UserRole {
    ADMIN = "ADMIN",
    CORPORATE = "CORPORATE",
    SMALL_BUSINESS = "SMALL_BUSINESS"
}

export class CreateCustomerInput {
    contactPerson: string;
    email: string;
    isActive: boolean;
    isFavorite: boolean;
    name: string;
    phone: string;
    type: CustomerType;
}

export class CreateEventInput {
    description?: Nullable<string>;
    endTime?: Nullable<DateTime>;
    jobId?: Nullable<string>;
    location?: Nullable<string>;
    startTime?: Nullable<DateTime>;
    title: string;
    type: EventType;
}

export class CreateInvoiceInput {
    amount: number;
    customerId: string;
    dueDate?: Nullable<DateTime>;
    invoiceNumber: string;
    issueDate?: Nullable<DateTime>;
    jobId: string;
    quickbooksSynced: boolean;
    status: InvoiceStatus;
}

export class CreateJobInput {
    assignedTo?: Nullable<string>;
    customerId: string;
    dueDate?: Nullable<DateTime>;
    isApproved: boolean;
    jobNumber: string;
    name: string;
    priority: JobPriority;
    status: JobStatus;
}

export class CreateMaterialInput {
    category: MaterialCategory;
    lowStock: boolean;
    materialId: string;
    minimumStock: number;
    name: string;
    notes?: Nullable<string>;
    price: number;
    stockLevel: number;
    supplier: string;
    unit?: Nullable<string>;
}

export class CreateUserInput {
    email: string;
    firstName: string;
    isTwoFactorEnabled?: Nullable<boolean>;
    lastName: string;
    password: string;
    role?: Nullable<UserRole>;
}

export class LoginInput {
    email: string;
    password: string;
}

export class UpdateCustomerInput {
    contactPerson?: Nullable<string>;
    email?: Nullable<string>;
    isActive?: Nullable<boolean>;
    isFavorite?: Nullable<boolean>;
    name?: Nullable<string>;
    phone?: Nullable<string>;
    type?: Nullable<CustomerType>;
}

export class UpdateEventInput {
    description?: Nullable<string>;
    endTime?: Nullable<DateTime>;
    jobId?: Nullable<string>;
    location?: Nullable<string>;
    startTime?: Nullable<DateTime>;
    title?: Nullable<string>;
    type?: Nullable<EventType>;
}

export class UpdateInvoiceInput {
    amount?: Nullable<number>;
    customerId?: Nullable<string>;
    dueDate?: Nullable<DateTime>;
    invoiceNumber?: Nullable<string>;
    issueDate?: Nullable<DateTime>;
    jobId?: Nullable<string>;
    quickbooksSynced?: Nullable<boolean>;
    status?: Nullable<InvoiceStatus>;
}

export class UpdateJobInput {
    assignedTo?: Nullable<string>;
    customerId?: Nullable<string>;
    dueDate?: Nullable<DateTime>;
    isApproved?: Nullable<boolean>;
    name?: Nullable<string>;
    priority?: Nullable<JobPriority>;
    status?: Nullable<JobStatus>;
}

export class UpdateMaterialInput {
    category?: Nullable<MaterialCategory>;
    lowStock?: Nullable<boolean>;
    minimumStock?: Nullable<number>;
    name?: Nullable<string>;
    notes?: Nullable<string>;
    price?: Nullable<number>;
    stockLevel?: Nullable<number>;
    supplier?: Nullable<string>;
    unit?: Nullable<string>;
}

export class UpdateUserInput {
    email?: Nullable<string>;
    firstName?: Nullable<string>;
    isTwoFactorEnabled?: Nullable<boolean>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
    role?: Nullable<UserRole>;
}

export class Customer {
    contactPerson: string;
    createdAt: DateTime;
    email: string;
    id: string;
    isActive: boolean;
    isFavorite: boolean;
    name: string;
    phone: string;
    type: CustomerType;
    updatedAt: DateTime;
}

export class Event {
    createdAt: DateTime;
    description?: Nullable<string>;
    endTime?: Nullable<DateTime>;
    id: string;
    job?: Nullable<Job>;
    jobId?: Nullable<string>;
    location?: Nullable<string>;
    startTime?: Nullable<DateTime>;
    title: string;
    type: EventType;
    updatedAt: DateTime;
}

export class Invoice {
    amount: number;
    createdAt: DateTime;
    customer: Customer;
    customerId: string;
    dueDate?: Nullable<DateTime>;
    id: string;
    invoiceNumber: string;
    issueDate?: Nullable<DateTime>;
    job: Job;
    jobId: string;
    quickbooksSynced: boolean;
    status: InvoiceStatus;
    updatedAt: DateTime;
}

export class Job {
    assignedTo: string;
    createdAt: DateTime;
    customer: Customer;
    customerId: string;
    dueDate?: Nullable<DateTime>;
    id: string;
    isApproved: boolean;
    jobNumber: string;
    name: string;
    priority: JobPriority;
    status: JobStatus;
    updatedAt: DateTime;
}

export class LoginResponse {
    token: string;
    user: UserResponse;
}

export class Material {
    category: MaterialCategory;
    createdAt: DateTime;
    id: string;
    lowStock: boolean;
    materialId: string;
    minimumStock: number;
    name: string;
    notes?: Nullable<string>;
    price: number;
    stockLevel: number;
    supplier: string;
    unit?: Nullable<string>;
    updatedAt: DateTime;
}

export abstract class IMutation {
    abstract createCustomer(createCustomerInput: CreateCustomerInput): Customer | Promise<Customer>;

    abstract createEvent(createEventInput: CreateEventInput): Event | Promise<Event>;

    abstract createInvoice(createInvoiceInput: CreateInvoiceInput): Invoice | Promise<Invoice>;

    abstract createJob(createJobInput: CreateJobInput): Job | Promise<Job>;

    abstract createMaterial(createMaterialInput: CreateMaterialInput): Material | Promise<Material>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract deleteCustomer(id: string): boolean | Promise<boolean>;

    abstract deleteEvent(id: string): boolean | Promise<boolean>;

    abstract deleteInvoice(id: string): boolean | Promise<boolean>;

    abstract deleteJob(id: string): boolean | Promise<boolean>;

    abstract deleteMaterial(id: string): boolean | Promise<boolean>;

    abstract deleteUser(id: string): boolean | Promise<boolean>;

    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract logout(): boolean | Promise<boolean>;

    abstract markInvoiceAsSynced(id: string): Invoice | Promise<Invoice>;

    abstract toggleCustomerFavorite(id: string): Customer | Promise<Customer>;

    abstract updateCustomer(id: string, updateCustomerInput: UpdateCustomerInput): Customer | Promise<Customer>;

    abstract updateEvent(id: string, updateEventInput: UpdateEventInput): Event | Promise<Event>;

    abstract updateInvoice(id: string, updateInvoiceInput: UpdateInvoiceInput): Invoice | Promise<Invoice>;

    abstract updateInvoiceStatus(id: string, status: string): Invoice | Promise<Invoice>;

    abstract updateJob(id: string, updateJobInput: UpdateJobInput): Job | Promise<Job>;

    abstract updateJobStatus(id: string, status: string): Job | Promise<Job>;

    abstract updateMaterial(id: string, updateMaterialInput: UpdateMaterialInput): Material | Promise<Material>;

    abstract updateMaterialStock(id: string, quantity: number): Material | Promise<Material>;

    abstract updateUser(id: string, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract validateToken(token: string): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract getActiveCustomers(): Customer[] | Promise<Customer[]>;

    abstract getAllCustomers(): Customer[] | Promise<Customer[]>;

    abstract getAllEvents(): Event[] | Promise<Event[]>;

    abstract getAllInvoices(): Invoice[] | Promise<Invoice[]>;

    abstract getAllJobs(): Job[] | Promise<Job[]>;

    abstract getAllMaterials(): Material[] | Promise<Material[]>;

    abstract getCustomer(id: string): Customer | Promise<Customer>;

    abstract getEvent(id: string): Event | Promise<Event>;

    abstract getEventsByDateRange(endDate: DateTime, startDate: DateTime): Event[] | Promise<Event[]>;

    abstract getEventsByJob(jobId: string): Event[] | Promise<Event[]>;

    abstract getEventsByType(type: string): Event[] | Promise<Event[]>;

    abstract getFavoriteCustomers(): Customer[] | Promise<Customer[]>;

    abstract getInactiveCustomers(): Customer[] | Promise<Customer[]>;

    abstract getInvoice(id: string): Invoice | Promise<Invoice>;

    abstract getInvoicesByCustomer(customerId: string): Invoice[] | Promise<Invoice[]>;

    abstract getInvoicesByJob(jobId: string): Invoice[] | Promise<Invoice[]>;

    abstract getInvoicesByMonth(month: number, year: number): Invoice[] | Promise<Invoice[]>;

    abstract getInvoicesByStatus(status: InvoiceStatus): Invoice[] | Promise<Invoice[]>;

    abstract getJob(id: string): Job | Promise<Job>;

    abstract getJobsByCustomer(customerId: string): Job[] | Promise<Job[]>;

    abstract getJobsByStatus(status: string): Job[] | Promise<Job[]>;

    abstract getLowStockMaterials(): Material[] | Promise<Material[]>;

    abstract getMaterial(id: string): Material | Promise<Material>;

    abstract getMaterialByMaterialId(materialId: string): Material | Promise<Material>;

    abstract getMaterialsByCategory(category: string): Material[] | Promise<Material[]>;

    abstract getOverdueInvoices(): Invoice[] | Promise<Invoice[]>;

    abstract getTodayEvents(): Event[] | Promise<Event[]>;

    abstract getTomorrowEvents(): Event[] | Promise<Event[]>;

    abstract getTotalOutstanding(): number | Promise<number>;

    abstract getTotalPaidThisMonth(): number | Promise<number>;

    abstract getUpcomingJobs(days: number): Job[] | Promise<Job[]>;

    abstract getUsers(): User[] | Promise<User[]>;
}

export class User {
    createdAt: DateTime;
    email: string;
    firstName: string;
    id: string;
    isActive: boolean;
    isTwoFactorEnabled: boolean;
    lastName: string;
    role: UserRole;
    updatedAt: DateTime;
}

export class UserResponse {
    createdAt: DateTime;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role: string;
    updatedAt: DateTime;
}

export type DateTime = any;
type Nullable<T> = T | null;
