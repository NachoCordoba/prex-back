import { MigrationInterface, QueryRunner } from "typeorm";

export class Attachment1709089661877 implements MigrationInterface {
    name = 'Attachment1709089661877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attachment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedBy" character varying, "deleteDate" TIMESTAMP, "attachment" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attachment" ADD CONSTRAINT "FK_c32d96ba8b2bab65f5432d19a3c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attachment" DROP CONSTRAINT "FK_c32d96ba8b2bab65f5432d19a3c"`);
        await queryRunner.query(`DROP TABLE "attachment"`);
    }

}
