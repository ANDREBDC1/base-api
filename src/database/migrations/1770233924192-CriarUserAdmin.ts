import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from "typeorm";

import { User } from "../../user/user.entity";
import { Permission } from "../../security/permission.entity";
import { PermissionAdmin } from "../../security/allPermissions";

export class CriarUserAdmin1770233924192 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            const userDb = await queryRunner.manager.count<User>("users",{
                where: {
                    name: "admin",
                    isAdmin: true
                }
            })

            if(userDb > 0){
                return;
            }

            const passwordHash = await bcrypt.hash(process.env.ADM_PASSWORD || "admin", 10);
            const result = await queryRunner.manager.insert<User>('users',
                { name: 'admin', email: process.env.ADM_EMAIL, password: passwordHash, isAdmin: true });

            const userId = result.identifiers[0].id

            await queryRunner.manager.insert<Permission>('permissions', {
                tipo: PermissionAdmin,
                descricao: PermissionAdmin,
                isActive: true,
                userId: userId
            })

        } catch (error) {

        }


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
