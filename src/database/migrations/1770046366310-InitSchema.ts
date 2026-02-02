import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1770046366310 implements MigrationInterface {
    name = 'InitSchema1770046366310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" integer PRIMARY KEY NOT NULL, "tipo" varchar NOT NULL, "descricao" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "userId" varchar NOT NULL, CONSTRAINT "UQ_0a8394e08eede4b80865979ee63" UNIQUE ("tipo"), CONSTRAINT "UQ_c60570051d297d8269fcdd9bc47" UNIQUE ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
