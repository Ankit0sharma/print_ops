import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCustomerTable1744300174830 implements MigrationInterface {
    name = 'AlterCustomerTable1744300174830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "customerType"`);
        await queryRunner.query(`DROP TYPE "public"."customers_customertype_enum"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "customerType" character varying NOT NULL DEFAULT 'small_business'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "customerType"`);
        await queryRunner.query(`CREATE TYPE "public"."customers_customertype_enum" AS ENUM('corporate', 'small_business', 'individual', 'non_profit')`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "customerType" "public"."customers_customertype_enum" NOT NULL DEFAULT 'small_business'`);
    }

}
