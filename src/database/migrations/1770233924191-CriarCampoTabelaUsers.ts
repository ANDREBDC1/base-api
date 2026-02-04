import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CriarCampoTabelaUser1770233924191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.addColumn("users", new TableColumn({
            name: 'isAdmin',
            type: 'boolean',
            isNullable: false,
            default: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropColumn('users', 'isAdmin');
    }

}
