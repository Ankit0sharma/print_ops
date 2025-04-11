"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvoiceTable1744391403363 = void 0;
class CreateInvoiceTable1744391403363 {
    constructor() {
        this.name = 'CreateInvoiceTable1744391403363';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "invoices" ADD "total" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_304ee0ea0e714d0fbd767cc7ca9"`);
        await queryRunner.query(`ALTER TABLE "invoices" ALTER COLUMN "jobId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "billingAddress"`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "billingAddress" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "paymentTerms"`);
        await queryRunner.query(`CREATE TYPE "public"."invoices_paymentterms_enum" AS ENUM('due_on_receipt', 'net_15', 'net_30', 'net_60')`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "paymentTerms" "public"."invoices_paymentterms_enum" NOT NULL DEFAULT 'due_on_receipt'`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_304ee0ea0e714d0fbd767cc7ca9" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_304ee0ea0e714d0fbd767cc7ca9"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "paymentTerms"`);
        await queryRunner.query(`DROP TYPE "public"."invoices_paymentterms_enum"`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "paymentTerms" character varying`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "billingAddress"`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD "billingAddress" text`);
        await queryRunner.query(`ALTER TABLE "invoices" ALTER COLUMN "jobId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_304ee0ea0e714d0fbd767cc7ca9" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "total"`);
    }
}
exports.CreateInvoiceTable1744391403363 = CreateInvoiceTable1744391403363;
//# sourceMappingURL=1744391403363-Create_invoice_table.js.map