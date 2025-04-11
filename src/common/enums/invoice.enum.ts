import { registerEnumType } from '@nestjs/graphql';

export enum InvoiceStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

export enum InvoicePaymentTerms {
  DUE_ON_RECEIPT = 'due_on_receipt',
  NET_15 = 'net_15',
  NET_30 = 'net_30',
  NET_60 = 'net_60',
}

export enum InvoiceSortField {
  DATE = 'date',
  AMOUNT = 'amount',
  DUE_DATE = 'dueDate',
  STATUS = 'status',
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(InvoiceStatus, {
  name: 'InvoiceStatus',
  description: 'Status of an invoice',
});

registerEnumType(InvoicePaymentTerms, {
  name: 'InvoicePaymentTerms',
  description: 'Payment terms for an invoice',
});

registerEnumType(InvoiceSortField, {
  name: 'InvoiceSortField',
  description: 'Fields by which invoices can be sorted',
});

registerEnumType(SortDirection, {
  name: 'SortDirection',
  description: 'Sort direction (ascending or descending)',
});
