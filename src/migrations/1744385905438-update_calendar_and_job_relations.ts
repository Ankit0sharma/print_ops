import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCalendarAndJobRelations1744385905438 implements MigrationInterface {
    name = 'UpdateCalendarAndJobRelations1744385905438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" RENAME COLUMN "assignedTo" TO "assignedToId"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "assignedToId"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "assignedToId" uuid`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_7fad893ebe41c6a77c07405af6b" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_7fad893ebe41c6a77c07405af6b"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "assignedToId"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "assignedToId" character varying`);
        await queryRunner.query(`ALTER TABLE "jobs" RENAME COLUMN "assignedToId" TO "assignedTo"`);
    }

}
