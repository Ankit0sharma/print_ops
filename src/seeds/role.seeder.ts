import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const permissionRepository = dataSource.getRepository(Permission);
    const roleRepository = dataSource.getRepository(Role);

    // Create permissions
    const permissions = [
      { name: 'view_jobs', description: 'View jobs', resource: 'jobs', action: 'view' },
      { name: 'create_jobs', description: 'Create jobs', resource: 'jobs', action: 'create' },
      { name: 'edit_jobs', description: 'Edit jobs', resource: 'jobs', action: 'edit' },
      { name: 'view_customers', description: 'View customers', resource: 'customers', action: 'view' },
      { name: 'manage_customers', description: 'Manage customers', resource: 'customers', action: 'manage' },
      { name: 'view_materials', description: 'View materials', resource: 'materials', action: 'view' },
      { name: 'manage_materials', description: 'Manage materials', resource: 'materials', action: 'manage' },
      { name: 'manage_settings', description: 'Manage settings', resource: 'settings', action: 'manage' },
    ];

    const savedPermissions = await Promise.all(
      permissions.map(async (permission) => {
        const exists = await permissionRepository.findOne({
          where: { name: permission.name },
        });
        if (!exists) {
          return permissionRepository.save(permission);
        }
        return exists;
      })
    );

    // Create roles with permissions
    const roles = [
      {
        name: 'Admin',
        description: 'Full system access',
        permissions: savedPermissions,
      },
      {
        name: 'Manager',
        description: 'Manage jobs and teams',
        permissions: savedPermissions.filter(p => 
          ['view_jobs', 'create_jobs', 'edit_jobs', 'view_customers', 'manage_customers'].includes(p.name)
        ),
      },
      {
        name: 'Designer',
        description: 'Handle design tasks',
        permissions: savedPermissions.filter(p => 
          ['view_jobs', 'edit_jobs'].includes(p.name)
        ),
      },
      {
        name: 'Production',
        description: 'Handle production tasks',
        permissions: savedPermissions.filter(p => 
          ['view_jobs', 'view_materials', 'manage_materials'].includes(p.name)
        ),
      },
      {
        name: 'Sales',
        description: 'Handle sales and customers',
        permissions: savedPermissions.filter(p => 
          ['view_jobs', 'create_jobs', 'view_customers', 'manage_customers'].includes(p.name)
        ),
      },
      {
        name: 'Accounting',
        description: 'Handle financial tasks',
        permissions: savedPermissions.filter(p => 
          ['view_jobs', 'view_customers'].includes(p.name)
        ),
      },
    ];

    await Promise.all(
      roles.map(async (role) => {
        const exists = await roleRepository.findOne({
          where: { name: role.name },
        });
        if (!exists) {
          return roleRepository.save(role);
        }
        return exists;
      })
    );
  }
}
