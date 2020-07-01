import { MigrationInterface, QueryRunner } from "typeorm";
import User from "../../entities/User";

export class CreateAdminUser1593088526221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        let user = new User();
        user.username = "admin";
        user.password = "admin";
        user.email = "teste@gmail.com";
        user.name = "Administrator";
        user.taxId = "12345678900";
        user.hashPassword();

        await queryRunner
            .manager
            .createQueryBuilder()
            .insert()
            .into('user')
            .values({
                name: user.name,
                username: user.username,
                password: user.password,
                email: user.email,
                taxId: user.taxId
             })
             .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner
            .manager
            .query("DELETE FROM user WHERE username = 'admin'");
    }

}
