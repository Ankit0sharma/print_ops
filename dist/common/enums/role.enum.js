"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRole = exports.CustomerRole = void 0;
const graphql_1 = require("@nestjs/graphql");
var CustomerRole;
(function (CustomerRole) {
    CustomerRole["ADMIN"] = "admin";
    CustomerRole["USER"] = "user";
    CustomerRole["MANAGER"] = "manager";
    CustomerRole["GUEST"] = "guest";
})(CustomerRole || (exports.CustomerRole = CustomerRole = {}));
(0, graphql_1.registerEnumType)(CustomerRole, {
    name: 'CustomerRole',
    description: 'Customer role types'
});
// Transform function to ensure case-insensitive input and lowercase storage
const transformRole = (role) => {
    const normalizedRole = role.toLowerCase();
    if (Object.values(CustomerRole).includes(normalizedRole)) {
        return normalizedRole;
    }
    throw new Error(`Invalid role: ${role}`);
};
exports.transformRole = transformRole;
//# sourceMappingURL=role.enum.js.map