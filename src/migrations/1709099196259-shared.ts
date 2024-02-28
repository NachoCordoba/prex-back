import { MigrationInterface, QueryRunner } from "typeorm";

export class Shared1709099196259 implements MigrationInterface {
    name = 'Shared1709099196259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attachment_shared_to_user" ("attachmentId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_4bd9f26835ec4ad3bd862080d4f" PRIMARY KEY ("attachmentId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b2a8afb62686bce339f2753854" ON "attachment_shared_to_user" ("attachmentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef06a1c5f1a0d1a1c7773e3664" ON "attachment_shared_to_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "attachment_shared_to_user" ADD CONSTRAINT "FK_b2a8afb62686bce339f27538542" FOREIGN KEY ("attachmentId") REFERENCES "attachment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "attachment_shared_to_user" ADD CONSTRAINT "FK_ef06a1c5f1a0d1a1c7773e36647" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attachment_shared_to_user" DROP CONSTRAINT "FK_ef06a1c5f1a0d1a1c7773e36647"`);
        await queryRunner.query(`ALTER TABLE "attachment_shared_to_user" DROP CONSTRAINT "FK_b2a8afb62686bce339f27538542"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef06a1c5f1a0d1a1c7773e3664"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b2a8afb62686bce339f2753854"`);
        await queryRunner.query(`DROP TABLE "attachment_shared_to_user"`);
    }

}
