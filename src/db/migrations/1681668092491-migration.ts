import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1681668092491 implements MigrationInterface {
    name = 'migration1681668092491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gallery" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_65d7a1ef91ddafb3e7071b188a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "refreshToken" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_d417e5d35f2434afc4bd48cb4d" UNIQUE ("userId"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "delivery" character varying NOT NULL, "locality" character varying NOT NULL, "department" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', "email" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "completed" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_goods" ("id" SERIAL NOT NULL, "items" integer NOT NULL, "goodId" integer, "orderId" integer, CONSTRAINT "PK_fb8033bc20ac2847fd8218e291f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_664ea405ae2a10c264d582ee563" UNIQUE ("name"), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub_groups" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "groupId" integer, CONSTRAINT "UQ_6e437a08ea08e93af3a91288756" UNIQUE ("name"), CONSTRAINT "PK_c36bf1873ade59f3034c627009a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "goods" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "text" text NOT NULL, "subGroupId" integer, CONSTRAINT "UQ_ebcb7aaacaead2fdf6ebcd9b77f" UNIQUE ("name"), CONSTRAINT "PK_105e56546afe0823fa08df0baf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "goodId" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_goods" ADD CONSTRAINT "FK_c688fa41e549779c4f6ca4a43a2" FOREIGN KEY ("goodId") REFERENCES "goods"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_goods" ADD CONSTRAINT "FK_6ba6399b78bf1c960c78289b25c" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_groups" ADD CONSTRAINT "FK_40a7363a26f78f39e343089c1c6" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "goods" ADD CONSTRAINT "FK_3c56e838cf31251d40052e08c80" FOREIGN KEY ("subGroupId") REFERENCES "sub_groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_8baf0a20c5a7d889fe8a926d49c" FOREIGN KEY ("goodId") REFERENCES "goods"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_8baf0a20c5a7d889fe8a926d49c"`);
        await queryRunner.query(`ALTER TABLE "goods" DROP CONSTRAINT "FK_3c56e838cf31251d40052e08c80"`);
        await queryRunner.query(`ALTER TABLE "sub_groups" DROP CONSTRAINT "FK_40a7363a26f78f39e343089c1c6"`);
        await queryRunner.query(`ALTER TABLE "order_goods" DROP CONSTRAINT "FK_6ba6399b78bf1c960c78289b25c"`);
        await queryRunner.query(`ALTER TABLE "order_goods" DROP CONSTRAINT "FK_c688fa41e549779c4f6ca4a43a2"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "goods"`);
        await queryRunner.query(`DROP TABLE "sub_groups"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "order_goods"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "gallery"`);
    }

}
