"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterCustomerTable1744300174830 = void 0;
class AlterCustomerTable1744300174830 {
    constructor() {
        this.name = 'AlterCustomerTable1744300174830';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "customerType"`);
        await queryRunner.query(`DROP TYPE "public"."customers_customertype_enum"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "customerType" character varying NOT NULL DEFAULT 'small_business'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "customerType"`);
        await queryRunner.query(`CREATE TYPE "public"."customers_customertype_enum" AS ENUM('corporate', 'small_business', 'individual', 'non_profit')`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "customerType" "public"."customers_customertype_enum" NOT NULL DEFAULT 'small_business'`);
    }
}
exports.AlterCustomerTable1744300174830 = AlterCustomerTable1744300174830;
//# sourceMappingURL=1744300174830-alter_customer_table.js.map