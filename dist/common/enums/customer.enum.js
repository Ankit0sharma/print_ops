"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformCustomerType = exports.CustomerStatus = exports.CustomerType = void 0;
const graphql_1 = require("@nestjs/graphql");
var CustomerType;
(function (CustomerType) {
    CustomerType["CORPORATE"] = "corporate";
    CustomerType["SMALL_BUSINESS"] = "small_business";
    CustomerType["INDIVIDUAL"] = "individual";
    CustomerType["NON_PROFIT"] = "non_profit";
})(CustomerType || (exports.CustomerType = CustomerType = {}));
var CustomerStatus;
(function (CustomerStatus) {
    CustomerStatus["ACTIVE"] = "active";
    CustomerStatus["INACTIVE"] = "inactive";
    CustomerStatus["PENDING"] = "pending";
    CustomerStatus["BLOCKED"] = "blocked";
})(CustomerStatus || (exports.CustomerStatus = CustomerStatus = {}));
(0, graphql_1.registerEnumType)(CustomerType, {
    name: 'CustomerType',
    description: 'Customer type categories'
});
(0, graphql_1.registerEnumType)(CustomerStatus, {
    name: 'CustomerStatus',
    description: 'Customer status options'
});
const transformCustomerType = (type) => {
    const normalizedType = type.toLowerCase();
    if (Object.values(CustomerType).includes(normalizedType)) {
        return normalizedType;
    }
    throw new Error(`Invalid customer type: ${type}`);
};
exports.transformCustomerType = transformCustomerType;
//# sourceMappingURL=customer.enum.js.map