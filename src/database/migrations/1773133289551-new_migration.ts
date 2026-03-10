import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1773133289551 implements MigrationInterface {
    name = 'NewMigration1773133289551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOnDate" TIMESTAMP NOT NULL DEFAULT now(), "createdOnByUserId" character varying, "lastModifiedOnDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedByUserId" character varying, "deleteAt" TIMESTAMP, "name" character varying NOT NULL, "url" character varying NOT NULL, "type" integer NOT NULL DEFAULT '0', "status" integer NOT NULL DEFAULT '1', "attributes" jsonb, "userId" uuid, CONSTRAINT "PK_f27321557a66cd4fae9bc1ed6e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "totalReviews"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "beds" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "baths" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "medias" ADD CONSTRAINT "FK_0ca422a52c318ce86181dbf01ed" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medias" DROP CONSTRAINT "FK_0ca422a52c318ce86181dbf01ed"`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "baths" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "beds" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "totalReviews" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "country" character varying NOT NULL DEFAULT 'USA'`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "medias"`);
    }

}
