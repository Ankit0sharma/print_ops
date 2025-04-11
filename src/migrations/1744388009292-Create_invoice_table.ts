import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvoiceTable1744388009292 implements MigrationInterface {
    name = 'CreateInvoiceTable1744388009292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" ADD "paymentTerms" character varying`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "items" json`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "subtotal" numeric(10,2) DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "taxRate" numeric(5,2) DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "notes" text`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "paymentInstructions" text`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "billingAddress" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "billingAddress"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "paymentInstructions"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "taxRate"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "subtotal"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "items"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "paymentTerms"`);
    }

}
