import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Realtys1741171403090 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'realtys',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  default: 'uuid()',
                },
                {
                  name: 'name',
                  type: 'varchar(50)',
                },
                {
                  name: 'is_active',
                  type: 'boolean',
                  default: true,
                },
                {
                  name: 'created_by',
                  type: 'uuid',
                  isNullable: true,
                },
                {
                  name: 'created_date',
                  type: 'datetime',
                  isNullable: true,
                },
                {
                  name: 'updated_by',
                  type: 'uuid',
                  isNullable: true,
                },
                {
                  name: 'updated_date',
                  type: 'datetime',
                  isNullable: true,
                },
              ],
            }),
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('realtys');
    }

}
