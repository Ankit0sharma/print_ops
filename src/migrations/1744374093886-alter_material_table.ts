import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterMaterialTable1744374093886 implements MigrationInterface {
    name = 'AlterMaterialTable1744374093886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "material_usage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "jobId" character varying NOT NULL, "notes" character varying, "usedAt" TIMESTAMP NOT NULL DEFAULT now(), "materialId" uuid, CONSTRAINT "PK_83d219e511ce9939194b210b038" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."purchase_orders_status_enum" AS ENUM('pending', 'ordered', 'received', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "purchase_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "unitPrice" numeric(10,2) NOT NULL, "totalPrice" numeric(10,2) NOT NULL, "status" "public"."purchase_orders_status_enum" NOT NULL DEFAULT 'pending', "orderNumber" character varying, "notes" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderedAt" TIMESTAMP, "receivedAt" TIMESTAMP, "materialId" uuid, CONSTRAINT "PK_05148947415204a897e8beb2553" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."materials_category_enum" RENAME TO "materials_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."materials_category_enum" AS ENUM('substrate', 'vinyl', 'electronics', 'hardware', 'ink')`);
        await queryRunner.query(`ALTER TABLE "materials" ALTER COLUMN "category" TYPE "public"."materials_category_enum" USING "category"::"text"::"public"."materials_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."materials_category_enum_old"`);
        await queryRunner.query(`ALTER TABLE "material_usage" ADD CONSTRAINT "FK_8af9a28225ade0e5cc229a2f88f" FOREIGN KEY ("materialId") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase_orders" ADD CONSTRAINT "FK_053daa651f9564daf022e91c174" FOREIGN KEY ("materialId") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_orders" DROP CONSTRAINT "FK_053daa651f9564daf022e91c174"`);
        await queryRunner.query(`ALTER TABLE "material_usage" DROP CONSTRAINT "FK_8af9a28225ade0e5cc229a2f88f"`);
        await queryRunner.query(`CREATE TYPE "public"."materials_category_enum_old" AS ENUM('substrate', 'vinyl')`);
        await queryRunner.query(`ALTER TABLE "materials" ALTER COLUMN "category" TYPE "public"."materials_category_enum_old" USING "category"::"text"::"public"."materials_category_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."materials_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."materials_category_enum_old" RENAME TO "materials_category_enum"`);
        await queryRunner.query(`DROP TABLE "purchase_orders"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "material_usage"`);
    }

}
