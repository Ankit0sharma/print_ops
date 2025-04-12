import { Connection } from 'typeorm';
import { Role } from '../../entities/role.entity';
import { Permission } from '../../entities/permission.entity';

// Define initial permissions
const permissions = [
  // Job permissions
  { name: 'view_jobs', description: 'View jobs', resource: 'jobs', action: 'view' },
  { name: 'create_jobs', description: 'Create jobs', resource: 'jobs', action: 'create' },
  { name: 'edit_jobs', description: 'Edit jobs', resource: 'jobs', action: 'edit' },
  { name: 'edit_job_status', description: 'Edit job status', resource: 'jobs', action: 'edit_status' },
  { name: 'upload_job_files', description: 'Upload job files', resource: 'jobs', action: 'upload_files' },

  // Customer permissions
  { name: 'view_customers', description: 'View customers', resource: 'customers', action: 'view' },
  { name: 'create_customers', description: 'Create customers', resource: 'customers', action: 'create' },
  { name: 'edit_customers', description: 'Edit customers', resource: 'customers', action: 'edit' },

  // Material permissions
  { name: 'view_materials', description: 'View materials', resource: 'materials', action: 'view' },
  { name: 'manage_materials', description: 'Manage materials', resource: 'materials', action: 'manage' },

  // Calendar permissions
  { name: 'view_calendar', description: 'View calendar', resource: 'calendar', action: 'view' },
  { name: 'manage_calendar', description: 'Manage calendar', resource: 'calendar', action: 'manage' },

  // System permissions
  { name: 'manage_settings', description: 'Manage system settings', resource: 'settings', action: 'manage' },
  { name: 'view_activity_log', description: 'View activity log', resource: 'activity_log', action: 'view' },
];

// Define initial roles with their permissions
const roles = [
  {
    name: 'Admin',
    description: 'Full access to all features and settings',
    permissions: permissions.map(p => p.name),
  },
  {
    name: 'Manager',
    description: 'Can manage jobs, customers, and materials, but cannot change system settings',
    permissions: [
      'view_jobs', 'create_jobs', 'edit_jobs',
      'view_customers', 'create_customers', 'edit_customers',
      'view_materials', 'manage_materials',
      'view_calendar', 'manage_calendar',
    ],
  },
  {
    name: 'Designer',
    description: 'Can view and update job designs and files',
    permissions: ['view_jobs', 'edit_jobs', 'upload_job_files'],
  },
  {
    name: 'Production',
    description: 'Can update job status and manage materials',
    permissions: ['view_jobs', 'edit_job_status', 'view_materials', 'manage_materials'],
  },
  {
    name: 'Sales',
    description: 'Can manage customers and create new jobs',
    permissions: ['view_customers', 'create_customers', 'create_jobs', 'view_jobs'],
  },
  {
    name: 'Accounting',
    description: 'Can view jobs and customers',
    permissions: ['view_jobs', 'view_customers'],
  },
];

export async function seedRolesAndPermissions(connection: Connection) {
  const permissionRepository = connection.getRepository(Permission);
  const roleRepository = connection.getRepository(Role);

  // Create permissions
  const savedPermissions = await Promise.all(
    permissions.map(async permission => {
      const existingPermission = await permissionRepository.findOne({
        where: { name: permission.name },
      });

      if (!existingPermission) {
        return permissionRepository.save(permission);
      }
      return existingPermission;
    })
  );

  // Create roles with their permissions
  await Promise.all(
    roles.map(async roleData => {
      const existingRole = await roleRepository.findOne({
        where: { name: roleData.name },
      });

      if (!existingRole) {
        const role = roleRepository.create({
          name: roleData.name,
          description: roleData.description,
          permissions: savedPermissions.filter(p => 
            roleData.permissions.includes(p.name)
          ),
        });
        await roleRepository.save(role);
      }
    })
  );
}
