import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

export const databaseConfig: TypeOrmModuleOptions = {
    type: process.env.DB_TYPE as 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/app/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    // retryAttempts: 1,
    // autoLoadEntities: false,
};
