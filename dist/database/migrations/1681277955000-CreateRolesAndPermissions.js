"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRolesAndPermissions1681277955000 = void 0;
const typeorm_1 = require("typeorm");
class CreateRolesAndPermissions1681277955000 {
    async up(queryRunner) {
        // Create permissions table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'permissions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'resource',
                    type: 'varchar',
                },
                {
                    name: 'action',
                    type: 'varchar',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }), true);
        // Create roles table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'roles',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }), true);
        // Create role_permissions junction table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'role_permissions',
            columns: [
                {
                    name: 'roleId',
                    type: 'uuid',
                },
                {
                    name: 'permissionId',
                    type: 'uuid',
                },
            ],
        }), true);
        // Add foreign keys
        await queryRunner.createForeignKey('role_permissions', new typeorm_1.TableForeignKey({
            columnNames: ['roleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('role_permissions', new typeorm_1.TableForeignKey({
            columnNames: ['permissionId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'permissions',
            onDelete: 'CASCADE',
        }));
        // Modify users table to add roleId
        await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "roleId" uuid REFERENCES "roles"(id),
      DROP COLUMN "role";
    `);
    }
    async down(queryRunner) {
        // Revert users table changes
        await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN "roleId",
      ADD COLUMN "role" varchar DEFAULT 'sales';
    `);
        // Drop foreign keys
        const rolePermissionsTable = await queryRunner.getTable('role_permissions');
        const foreignKeys = rolePermissionsTable.foreignKeys;
        await Promise.all(foreignKeys.map(foreignKey => queryRunner.dropForeignKey('role_permissions', foreignKey)));
        // Drop tables
        await queryRunner.dropTable('role_permissions');
        await queryRunner.dropTable('roles');
        await queryRunner.dropTable('permissions');
    }
}
exports.CreateRolesAndPermissions1681277955000 = CreateRolesAndPermissions1681277955000;
//# sourceMappingURL=1681277955000-CreateRolesAndPermissions.js.map