import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class TaskTable1711988104758 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the task table
        await queryRunner.createTable(new Table({
            name: 'task',
            columns: [
                {
                    name: 'task_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'event_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'task_name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'task_date',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'responsible_person',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'email_to',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'reminder_date',
                    type: 'date',
                    isNullable: true,
                },
                {
                    name: 'reminder_time',
                    type: 'time',
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
            foreignKeys: [
                {
                    columnNames: ['event_id'],
                    referencedColumnNames: ['event_id'],
                    referencedTableName: 'event',
                    onDelete: 'CASCADE',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraint
        await queryRunner.dropForeignKey('task', 'event_id');

        // Drop the task table
        await queryRunner.dropTable('task');
    }

}
