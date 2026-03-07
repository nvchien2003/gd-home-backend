import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1772447089571 implements MigrationInterface {
  name = 'NewMigration1772447089571';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "amenities" ("createdOnDate" TIMESTAMP NOT NULL DEFAULT now(), "createdOnByUserId" character varying, "lastModifiedOnDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedByUserId" character varying, "deleteAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_8c5f9c7ff7e2174b53d4be10247" UNIQUE ("name"), CONSTRAINT "PK_c0777308847b3556086f2fb233e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "property_images" ("createdOnDate" TIMESTAMP NOT NULL DEFAULT now(), "createdOnByUserId" character varying, "lastModifiedOnDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedByUserId" character varying, "deleteAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imageUrl" character varying NOT NULL, "isThumbnail" boolean NOT NULL DEFAULT false, "property_id" uuid, CONSTRAINT "PK_317c3774ee70c26d70c4f80e200" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("createdOnDate" TIMESTAMP NOT NULL DEFAULT now(), "createdOnByUserId" character varying, "lastModifiedOnDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedByUserId" character varying, "deleteAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "comment" text NOT NULL, "property_id" uuid, "user_id" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."properties_type_enum" AS ENUM('villa', 'apartment', 'house', 'cabin', 'loft')`,
    );
    await queryRunner.query(
      `CREATE TABLE "properties" ("createdOnDate" TIMESTAMP NOT NULL DEFAULT now(), "createdOnByUserId" character varying, "lastModifiedOnDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedByUserId" character varying, "deleteAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "price" numeric(12,2) NOT NULL, "pricePerMonth" numeric(12,2), "beds" integer NOT NULL, "baths" numeric(3,1) NOT NULL, "sqft" integer NOT NULL, "type" "public"."properties_type_enum" NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL DEFAULT 'USA', "averageRating" numeric(3,2) NOT NULL DEFAULT '0', "totalReviews" integer NOT NULL DEFAULT '0', "owner_id" uuid, CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "property_amenities" ("propertiesId" uuid NOT NULL, "amenitiesId" uuid NOT NULL, CONSTRAINT "PK_fe91206eb579182179293c26e5e" PRIMARY KEY ("propertiesId", "amenitiesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_73f149bf7a208e3fa00d5e9d32" ON "property_amenities" ("propertiesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6ff8f55ba52924e4418a6b4b71" ON "property_amenities" ("amenitiesId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `,
    );
    await queryRunner.query(
      `ALTER TABLE "property_images" ADD CONSTRAINT "FK_162a7701665354b4751ffb835e4" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_2b1e1cd13649e9315b28b7f2f0c" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD CONSTRAINT "FK_797b76e2d11a5bf755127d1aa67" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "property_amenities" ADD CONSTRAINT "FK_73f149bf7a208e3fa00d5e9d327" FOREIGN KEY ("propertiesId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "property_amenities" ADD CONSTRAINT "FK_6ff8f55ba52924e4418a6b4b716" FOREIGN KEY ("amenitiesId") REFERENCES "amenities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "property_amenities" DROP CONSTRAINT "FK_6ff8f55ba52924e4418a6b4b716"`,
    );
    await queryRunner.query(
      `ALTER TABLE "property_amenities" DROP CONSTRAINT "FK_73f149bf7a208e3fa00d5e9d327"`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" DROP CONSTRAINT "FK_797b76e2d11a5bf755127d1aa67"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_2b1e1cd13649e9315b28b7f2f0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "property_images" DROP CONSTRAINT "FK_162a7701665354b4751ffb835e4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6ff8f55ba52924e4418a6b4b71"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_73f149bf7a208e3fa00d5e9d32"`,
    );
    await queryRunner.query(`DROP TABLE "property_amenities"`);
    await queryRunner.query(`DROP TABLE "properties"`);
    await queryRunner.query(`DROP TYPE "public"."properties_type_enum"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TABLE "property_images"`);
    await queryRunner.query(`DROP TABLE "amenities"`);
  }
}
