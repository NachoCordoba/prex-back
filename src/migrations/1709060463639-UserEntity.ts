import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1709060463639 implements MigrationInterface {
    name = 'UserEntity1709060463639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdBy" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedBy" character varying, "deleteDate" TIMESTAMP, "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
