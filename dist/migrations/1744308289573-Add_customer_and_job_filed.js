"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCustomerAndJobFiled1744308289573 = void 0;
class AddCustomerAndJobFiled1744308289573 {
    constructor() {
        this.name = 'AddCustomerAndJobFiled1744308289573';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "jobNumber"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "width" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "height" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "quantity" double precision NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "printMaterial" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "laminateMaterial" character varying`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "productionNotes" text`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_status_enum" RENAME TO "jobs_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_status_enum" AS ENUM('Design', 'Production', 'Print', 'Approval', 'Completed')`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" TYPE "public"."jobs_status_enum" USING "status"::"text"::"public"."jobs_status_enum"`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" SET DEFAULT 'Design'`);
        await queryRunner.query(`DROP TYPE "public"."jobs_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_priority_enum" RENAME TO "jobs_priority_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_priority_enum" AS ENUM('Low', 'Normal', 'High', 'Urgent')`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "priority" TYPE "public"."jobs_priority_enum" USING "priority"::"text"::"public"."jobs_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "priority" SET DEFAULT 'Normal'`);
        await queryRunner.query(`DROP TYPE "public"."jobs_priority_enum_old"`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "dueDate" SET NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "dueDate" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_priority_enum_old" AS ENUM('high', 'normal', 'urgent')`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "priority" TYPE "public"."jobs_priority_enum_old" USING "priority"::"text"::"public"."jobs_priority_enum_old"`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "priority" SET DEFAULT 'normal'`);
        await queryRunner.query(`DROP TYPE "public"."jobs_priority_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_priority_enum_old" RENAME TO "jobs_priority_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_status_enum_old" AS ENUM('design', 'production', 'print', 'approval', 'completed')`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" TYPE "public"."jobs_status_enum_old" USING "status"::"text"::"public"."jobs_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "status" SET DEFAULT 'design'`);
        await queryRunner.query(`DROP TYPE "public"."jobs_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_status_enum_old" RENAME TO "jobs_status_enum"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "productionNotes"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "laminateMaterial"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "printMaterial"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "width"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "jobNumber" character varying NOT NULL`);
    }
}
exports.AddCustomerAndJobFiled1744308289573 = AddCustomerAndJobFiled1744308289573;
//# sourceMappingURL=1744308289573-Add_customer_and_job_filed.js.map