"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeRolesPermissionsToAutoIncrement1744438850423 = void 0;
class ChangeRolesPermissionsToAutoIncrement1744438850423 {
    constructor() {
        this.name = 'ChangeRolesPermissionsToAutoIncrement1744438850423';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" integer`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "PK_920331560282b8bd21bb02290df"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "PK_c1433d71a4838793a49dcad46ab"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "PK_d430a02aad006d8a70f3acd7d03"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "PK_06792d0c62ce6b0203c03643cdd" PRIMARY KEY ("permissionId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b4599f8b8f548d35850afa2d12"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD "roleId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "PK_06792d0c62ce6b0203c03643cdd"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "PK_d430a02aad006d8a70f3acd7d03" PRIMARY KEY ("permissionId", "roleId")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "PK_d430a02aad006d8a70f3acd7d03"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "PK_b4599f8b8f548d35850afa2d12c" PRIMARY KEY ("roleId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06792d0c62ce6b0203c03643cd"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP COLUMN "permissionId"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD "permissionId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "PK_b4599f8b8f548d35850afa2d12c"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "PK_d430a02aad006d8a70f3acd7d03" PRIMARY KEY ("roleId", "permissionId")`);
        await queryRunner.query(`CREATE INDEX "IDX_b4599f8b8f548d35850afa2d12" ON "role_permissions" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_06792d0c62ce6b0203c03643cd" ON "role_permissions" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06792d0c62ce6b0203c03643cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b4599f8b8f548d35850afa2d12"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "PK_d430a02aad006d8a70f3acd7d03"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "PK_b4599f8b8f548d35850afa2d12c" PRIMARY KEY ("roleId")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP COLUMN "permissionId"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD "permissionId" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_06792d0c62ce6b0203c03643cd" ON "role_permissions" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "PK_b4599f8b8f548d35850afa2d12c"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "PK_d430a02aad006d8a70f3acd7d03" PRIMARY KEY ("permissionId", "roleId")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "PK_d430a02aad006d8a70f3acd7d03"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "PK_06792d0c62ce6b0203c03643cdd" PRIMARY KEY ("permissionId")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD "roleId" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_b4599f8b8f548d35850afa2d12" ON "role_permissions" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "PK_06792d0c62ce6b0203c03643cdd"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "PK_d430a02aad006d8a70f3acd7d03" PRIMARY KEY ("roleId", "permissionId")`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "PK_c1433d71a4838793a49dcad46ab"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "PK_920331560282b8bd21bb02290df"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.ChangeRolesPermissionsToAutoIncrement1744438850423 = ChangeRolesPermissionsToAutoIncrement1744438850423;
//# sourceMappingURL=1744438850423-change_roles_permissions_to_auto_increment.js.map