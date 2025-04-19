import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCategoryFieldImage1745040550996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('categories_house', [
      new TableColumn({
        name: 'cover_image',
        type: 'text',
        isNullable: true,
      }),
      new TableColumn({
        name: 'code_categories',
        type: 'text',
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('categories_house', [
      new TableColumn({
        name: 'cover_image',
        type: 'text',
        isNullable: true,
      }),
      new TableColumn({
        name: 'code_categories',
        type: 'text',
        isNullable: false,
      }),
    ]);
  }
}
