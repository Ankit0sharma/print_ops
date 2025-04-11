"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderStatus = exports.MaterialCategory = void 0;
const graphql_1 = require("@nestjs/graphql");
var MaterialCategory;
(function (MaterialCategory) {
    MaterialCategory["SUBSTRATE"] = "substrate";
    MaterialCategory["VINYL"] = "vinyl";
    MaterialCategory["ELECTRONICS"] = "electronics";
    MaterialCategory["HARDWARE"] = "hardware";
    MaterialCategory["INK"] = "ink";
})(MaterialCategory || (exports.MaterialCategory = MaterialCategory = {}));
var PurchaseOrderStatus;
(function (PurchaseOrderStatus) {
    PurchaseOrderStatus["PENDING"] = "pending";
    PurchaseOrderStatus["ORDERED"] = "ordered";
    PurchaseOrderStatus["RECEIVED"] = "received";
    PurchaseOrderStatus["CANCELLED"] = "cancelled";
})(PurchaseOrderStatus || (exports.PurchaseOrderStatus = PurchaseOrderStatus = {}));
(0, graphql_1.registerEnumType)(MaterialCategory, {
    name: 'MaterialCategory',
    description: 'Material category types',
});
(0, graphql_1.registerEnumType)(PurchaseOrderStatus, {
    name: 'PurchaseOrderStatus',
    description: 'Purchase order status types',
});
//# sourceMappingURL=material.enum.js.map