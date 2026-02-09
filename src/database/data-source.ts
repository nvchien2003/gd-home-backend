import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSource : DataSourceOptions ={
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["dist/database/**/*.entity{.ts,.js}"],
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    synchronize: true,
};

export const AppDataSource = new DataSource(dataSource);