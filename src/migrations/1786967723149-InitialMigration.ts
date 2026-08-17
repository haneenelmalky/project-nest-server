import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1786967723149 implements MigrationInterface {
  name = 'InitialMigration1786967723149';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" ALTER COLUMN "uuid" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" ALTER COLUMN "uuid" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`,
    );
  }
}