import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PlannerTable1710391898774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'planner',
            columns: [
                {
                    name: 'planner_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'contact',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'business_name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'business_description',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'portfolio_link',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'average_price',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'pricing_info',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'services_offered',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'created_by',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'updated_by',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'deleted_by',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('planner');
    }

}
