import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1644249694638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'password',
                        type: 'varchar'
                    },
                    {
                        name: 'contact',
                        type: 'number'
                    },
                    {
                        name: 'isAdmin',
                        type: 'varchar'
                    },
                    {
                        name: 'address',
                        type: 'varchar'
                    },
                    {
                        name: 'created_At',
                        type: 'timestamp',
						default: 'now()',
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
