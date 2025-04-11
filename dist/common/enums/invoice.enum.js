"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortDirection = exports.InvoiceSortField = exports.InvoicePaymentTerms = exports.InvoiceStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["DRAFT"] = "draft";
    InvoiceStatus["PENDING"] = "pending";
    InvoiceStatus["PAID"] = "paid";
    InvoiceStatus["OVERDUE"] = "overdue";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
var InvoicePaymentTerms;
(function (InvoicePaymentTerms) {
    InvoicePaymentTerms["DUE_ON_RECEIPT"] = "due_on_receipt";
    InvoicePaymentTerms["NET_15"] = "net_15";
    InvoicePaymentTerms["NET_30"] = "net_30";
    InvoicePaymentTerms["NET_60"] = "net_60";
})(InvoicePaymentTerms || (exports.InvoicePaymentTerms = InvoicePaymentTerms = {}));
var InvoiceSortField;
(function (InvoiceSortField) {
    InvoiceSortField["DATE"] = "date";
    InvoiceSortField["AMOUNT"] = "amount";
    InvoiceSortField["DUE_DATE"] = "dueDate";
    InvoiceSortField["STATUS"] = "status";
})(InvoiceSortField || (exports.InvoiceSortField = InvoiceSortField = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "ASC";
    SortDirection["DESC"] = "DESC";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
(0, graphql_1.registerEnumType)(InvoiceStatus, {
    name: 'InvoiceStatus',
    description: 'Status of an invoice',
});
(0, graphql_1.registerEnumType)(InvoicePaymentTerms, {
    name: 'InvoicePaymentTerms',
    description: 'Payment terms for an invoice',
});
(0, graphql_1.registerEnumType)(InvoiceSortField, {
    name: 'InvoiceSortField',
    description: 'Fields by which invoices can be sorted',
});
(0, graphql_1.registerEnumType)(SortDirection, {
    name: 'SortDirection',
    description: 'Sort direction (ascending or descending)',
});
//# sourceMappingURL=invoice.enum.js.map