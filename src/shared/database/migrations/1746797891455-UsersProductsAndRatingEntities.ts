import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersProductsAndRatingEntities1746797891455 implements MigrationInterface {
    name = 'UsersProductsAndRatingEntities1746797891455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(44) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "externalProductId" integer NOT NULL, "description" text NOT NULL, "category" character varying NOT NULL, "image" character varying NOT NULL, "ratingId" uuid, CONSTRAINT "REL_c57b10778881a0966e984396bd" UNIQUE ("ratingId"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "rate" numeric(2,1) NOT NULL, "count" integer NOT NULL, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_favorite_products" ("user_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_6b38b391113aa0ca9360f470da3" PRIMARY KEY ("user_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3f5c6496edcc249b5edcb54add" ON "user_favorite_products" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce71c9d4ce234802e27f909c64" ON "user_favorite_products" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_c57b10778881a0966e984396bd0" FOREIGN KEY ("ratingId") REFERENCES "rating"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorite_products" ADD CONSTRAINT "FK_3f5c6496edcc249b5edcb54add7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorite_products" ADD CONSTRAINT "FK_ce71c9d4ce234802e27f909c64a" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorite_products" DROP CONSTRAINT "FK_ce71c9d4ce234802e27f909c64a"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_products" DROP CONSTRAINT "FK_3f5c6496edcc249b5edcb54add7"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_c57b10778881a0966e984396bd0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce71c9d4ce234802e27f909c64"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f5c6496edcc249b5edcb54add"`);
        await queryRunner.query(`DROP TABLE "user_favorite_products"`);
        await queryRunner.query(`DROP TABLE "rating"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
