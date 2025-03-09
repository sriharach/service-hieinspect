import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ColumnAddHouse1741496838128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('model_house', [
      new TableColumn({
        name: 'code_house',
        type: 'text',
        isNullable: false,
      }),
      new TableColumn({
        name: 'main_img_house',
        type: 'text',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('model_house', [
      new TableColumn({
        name: 'code_house',
        type: 'text',
        isNullable: false,
      }),
      new TableColumn({
        name: 'main_img_house',
        type: 'text',
        isNullable: true,
      }),
    ]);
  }
}
