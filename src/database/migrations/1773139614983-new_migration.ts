import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1773139614983 implements MigrationInterface {
    name = 'NewMigration1773139614983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medias" ADD "propertyId" uuid`);
        await queryRunner.query(`ALTER TABLE "medias" ADD CONSTRAINT "FK_056e28eb29a0f52a550e4b9f960" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medias" DROP CONSTRAINT "FK_056e28eb29a0f52a550e4b9f960"`);
        await queryRunner.query(`ALTER TABLE "medias" DROP COLUMN "propertyId"`);
    }

}
