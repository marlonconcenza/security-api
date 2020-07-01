import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTables1593087082372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "50"
                },
                {
                    name: "username",
                    type: "varchar",
                    length: "30",
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "100"
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "100"
                },
                {
                    name: "taxId",
                    type: "varchar",
                    length: "20",
                    isUnique: true
                },
                {
                    name: "createdAt",
                    type: "date",
                    default: "CURRENT_TIMESTAMP"
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("user");
    }
}
