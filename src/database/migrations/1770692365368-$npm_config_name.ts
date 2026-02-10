import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1770692365368 implements MigrationInterface {
  name = ' $npmConfigName1770692365368';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("createdOnDate" TIMESTAMP NOT NULL DEFAULT now(), "createdOnByUserId" character varying, "lastModifiedOnDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedByUserId" character varying, "deleteAt" TIMESTAMP, "id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "avatar" character varying, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
