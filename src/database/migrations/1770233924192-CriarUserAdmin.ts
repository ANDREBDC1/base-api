import { MigrationInterface, QueryRunner } from "typeorm";

import { User } from "../../user/user.entity";
import { Permission } from "../../security/permission.entity";
import { PermissionAdmin } from "../../security/allPermissions";
import { hash } from "../../commun/hashString";

export class CriarUserAdmin1770233924192 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const email = process.env.ADM_EMAIL || "admin@teste.com"
        const passwordHash = await hash(process.env.ADM_PASSWORD || "admin");
        const result = await queryRunner.manager.insert<User>('users',
            {
                name: 'admin',
                email: email,
                password: passwordHash,
                isAdmin: true
            });

        const userId = result.identifiers[0].id

        await queryRunner.manager.insert<Permission>('permissions', {
            tipo: PermissionAdmin,
            descricao: PermissionAdmin,
            isActive: true,
            userId: userId
        })


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
