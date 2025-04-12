"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_PERMISSIONS = exports.UserPermission = exports.UserRole = void 0;
const graphql_1 = require("@nestjs/graphql");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MANAGER"] = "manager";
    UserRole["DESIGNER"] = "designer";
    UserRole["PRODUCTION"] = "production";
    UserRole["SALES"] = "sales";
    UserRole["ACCOUNTING"] = "accounting";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserPermission;
(function (UserPermission) {
    UserPermission["VIEW_JOBS"] = "view_jobs";
    UserPermission["CREATE_JOBS"] = "create_jobs";
    UserPermission["EDIT_JOBS"] = "edit_jobs";
    UserPermission["VIEW_CUSTOMERS"] = "view_customers";
    UserPermission["MANAGE_CUSTOMERS"] = "manage_customers";
    UserPermission["VIEW_MATERIALS"] = "view_materials";
    UserPermission["MANAGE_MATERIALS"] = "manage_materials";
    UserPermission["MANAGE_SETTINGS"] = "manage_settings";
})(UserPermission || (exports.UserPermission = UserPermission = {}));
(0, graphql_1.registerEnumType)(UserRole, {
    name: 'UserRole',
    description: 'User role enum',
});
(0, graphql_1.registerEnumType)(UserPermission, {
    name: 'UserPermission',
    description: 'User permission enum',
});
exports.ROLE_PERMISSIONS = {
    [UserRole.ADMIN]: Object.values(UserPermission),
    [UserRole.MANAGER]: [
        UserPermission.VIEW_JOBS,
        UserPermission.CREATE_JOBS,
        UserPermission.EDIT_JOBS,
        UserPermission.VIEW_CUSTOMERS,
        UserPermission.MANAGE_CUSTOMERS,
    ],
    [UserRole.DESIGNER]: [
        UserPermission.VIEW_JOBS,
        UserPermission.EDIT_JOBS,
    ],
    [UserRole.PRODUCTION]: [
        UserPermission.VIEW_JOBS,
        UserPermission.VIEW_MATERIALS,
        UserPermission.MANAGE_MATERIALS,
    ],
    [UserRole.SALES]: [
        UserPermission.VIEW_JOBS,
        UserPermission.CREATE_JOBS,
        UserPermission.VIEW_CUSTOMERS,
        UserPermission.MANAGE_CUSTOMERS,
    ],
    [UserRole.ACCOUNTING]: [
        UserPermission.VIEW_JOBS,
        UserPermission.VIEW_CUSTOMERS,
    ],
};
//# sourceMappingURL=user.enum.js.map