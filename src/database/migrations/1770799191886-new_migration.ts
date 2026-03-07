import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1770799191886 implements MigrationInterface {
  name = 'NewMigration1770799191886';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("createdOnDate" TIMESTAMP NOT NULL DEFAULT now(), "createdOnByUserId" character varying, "lastModifiedOnDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedByUserId" character varying, "deleteAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "avatar" character varying, "isAdmin" boolean NOT NULL DEFAULT false, "verify" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "otp" ("createdOnDate" TIMESTAMP NOT NULL DEFAULT now(), "createdOnByUserId" character varying, "lastModifiedOnDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedByUserId" character varying, "deleteAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "code" character varying NOT NULL, "type" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "otp"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
