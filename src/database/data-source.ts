import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const dataSource: DataSourceOptions = {
  type: 'postgres',

  ...(process.env.DATABASE_URL
    ? {
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 5432),
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'gd_home',
      }),

  entities: ['dist/database/**/*.entity.{js}'],
  migrations: ['dist/database/migrations/*.{js}'],

  synchronize: false,
  logging: !isProduction,
};

export const AppDataSource = new DataSource(dataSource);
export default AppDataSource;
