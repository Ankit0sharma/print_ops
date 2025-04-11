import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCalanderTable1744377571074 implements MigrationInterface {
    name = 'AlterCalanderTable1744377571074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."calendar_events_eventtype_enum" AS ENUM('installation', 'meeting', 'deadline', 'reminder')`);
        await queryRunner.query(`CREATE TYPE "public"."calendar_events_status_enum" AS ENUM('scheduled', 'in_progress', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TYPE "public"."calendar_events_repeattype_enum" AS ENUM('none', 'daily', 'weekly', 'monthly')`);
        await queryRunner.query(`CREATE TABLE "calendar_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "eventType" "public"."calendar_events_eventtype_enum" NOT NULL, "status" "public"."calendar_events_status_enum" NOT NULL DEFAULT 'scheduled', "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "location" character varying, "repeatType" "public"."calendar_events_repeattype_enum" NOT NULL DEFAULT 'none', "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "assignedToId" uuid, "jobId" uuid, CONSTRAINT "PK_faf5391d232322a87cdd1c6f30c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "calendar_events" ADD CONSTRAINT "FK_9d1d1c68fcb64cd8b572b64d734" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calendar_events" ADD CONSTRAINT "FK_5a6a066c32fdd238972ad244bd4" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_events" DROP CONSTRAINT "FK_5a6a066c32fdd238972ad244bd4"`);
        await queryRunner.query(`ALTER TABLE "calendar_events" DROP CONSTRAINT "FK_9d1d1c68fcb64cd8b572b64d734"`);
        await queryRunner.query(`DROP TABLE "calendar_events"`);
        await queryRunner.query(`DROP TYPE "public"."calendar_events_repeattype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."calendar_events_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."calendar_events_eventtype_enum"`);
    }

}
