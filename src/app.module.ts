import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MysqlDbType } from './db/datasource';
import { SnakeCaseStrategy } from './db/snakecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';

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
            entities: [],
            namingStrategy: new SnakeCaseStrategy(),
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
