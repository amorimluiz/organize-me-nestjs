import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedUsersAndAuthTokensTables1719761065333 implements MigrationInterface {
    public name = 'AddedUsersAndAuthTokensTables1719761065333';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `auth_tokens` (`id` varchar(36) NOT NULL, `token` varchar(255) NOT NULL, `is_revoked` tinyint NOT NULL DEFAULT 0, `expires_at` datetime(6) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `user_id` varchar(36) NULL, UNIQUE INDEX `IDX_0db4d75e7b32888464cdf8e374` (`token`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `users` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, `full_name` varchar(100) NOT NULL, `password` varchar(80) NOT NULL, `profile_photo` varchar(36) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `auth_tokens` ADD CONSTRAINT `FK_9691367d446cd8b18f462c191b3` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `auth_tokens` DROP FOREIGN KEY `FK_9691367d446cd8b18f462c191b3`');
        await queryRunner.query('DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`');
        await queryRunner.query('DROP TABLE `users`');
        await queryRunner.query('DROP INDEX `IDX_0db4d75e7b32888464cdf8e374` ON `auth_tokens`');
        await queryRunner.query('DROP TABLE `auth_tokens`');
    }

}
