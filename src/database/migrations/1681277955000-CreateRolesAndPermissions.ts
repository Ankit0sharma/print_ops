import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateRolesAndPermissions1681277955000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create permissions table
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );

    // Create roles table
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );

    // Create role_permissions junction table
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );

    // Add foreign keys
    await queryRunner.createForeignKey(
      'role_permissions',
      new TableForeignKey({
        columnNames: ['roleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'role_permissions',
      new TableForeignKey({
        columnNames: ['permissionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permissions',
        onDelete: 'CASCADE',
      })
    );

    // Modify users table to add roleId
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "roleId" uuid REFERENCES "roles"(id),
      DROP COLUMN "role";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert users table changes
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN "roleId",
      ADD COLUMN "role" varchar DEFAULT 'sales';
    `);

    // Drop foreign keys
    const rolePermissionsTable = await queryRunner.getTable('role_permissions');
    const foreignKeys = rolePermissionsTable.foreignKeys;
    
    await Promise.all(
      foreignKeys.map(foreignKey =>
        queryRunner.dropForeignKey('role_permissions', foreignKey)
      )
    );

    // Drop tables
    await queryRunner.dropTable('role_permissions');
    await queryRunner.dropTable('roles');
    await queryRunner.dropTable('permissions');
  }
}
