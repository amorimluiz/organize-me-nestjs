import { AuthToken } from './db/entities/AuthToken.entity';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MysqlDbType } from './db/datasource';
import { SnakeCaseStrategy } from './db/snakecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './db/entities/User.entity';
import { env } from 'process';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: env.DB_TYPE as MysqlDbType,
            host: env.DB_HOST,
            port: Number(env.DB_PORT),
            username: env.DB_USER,
            password: env.DB_PASSWORD,
            database: env.DB_NAME,
            entities: [User, AuthToken],
            namingStrategy: new SnakeCaseStrategy(),
        }),
        AuthModule,
    ],
    controllers: [AuthController],
    providers: [],
})
export class AppModule {}
