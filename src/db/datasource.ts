import * as dotenv from 'dotenv';

import { DataSource } from 'typeorm';
import { SnakeCaseStrategy } from './snakecase';
import { env } from 'process';
import { join } from 'path';

export type MysqlDbType = 'mysql' | 'mariadb';

dotenv.config();

const dataSource = new DataSource({
    type: env.DB_TYPE as MysqlDbType,
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: [join(__dirname, 'entities', '**', '*.js')],
    migrations: [join(__dirname, 'migrations', '**', '*.js')],
    namingStrategy: new SnakeCaseStrategy(),
});

export default dataSource;
