import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  DESIGNER = 'designer',
  PRODUCTION = 'production',
  SALES = 'sales',
  ACCOUNTING = 'accounting'
}

export enum UserPermission {
  VIEW_JOBS = 'view_jobs',
  CREATE_JOBS = 'create_jobs',
  EDIT_JOBS = 'edit_jobs',
  VIEW_CUSTOMERS = 'view_customers',
  MANAGE_CUSTOMERS = 'manage_customers',
  VIEW_MATERIALS = 'view_materials',
  MANAGE_MATERIALS = 'manage_materials',
  MANAGE_SETTINGS = 'manage_settings'
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role enum',
});

registerEnumType(UserPermission, {
  name: 'UserPermission',
  description: 'User permission enum',
});

export const ROLE_PERMISSIONS: Record<UserRole, UserPermission[]> = {
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
