"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCalendarAndJobRelations1744385905438 = void 0;
class UpdateCalendarAndJobRelations1744385905438 {
    constructor() {
        this.name = 'UpdateCalendarAndJobRelations1744385905438';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "jobs" RENAME COLUMN "assignedTo" TO "assignedToId"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "assignedToId"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "assignedToId" uuid`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_7fad893ebe41c6a77c07405af6b" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_7fad893ebe41c6a77c07405af6b"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "assignedToId"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "assignedToId" character varying`);
        await queryRunner.query(`ALTER TABLE "jobs" RENAME COLUMN "assignedToId" TO "assignedTo"`);
    }
}
exports.UpdateCalendarAndJobRelations1744385905438 = UpdateCalendarAndJobRelations1744385905438;
//# sourceMappingURL=1744385905438-update_calendar_and_job_relations.js.map