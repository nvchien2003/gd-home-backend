import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const options: DataSourceOptions = {
  type: 'postgres' as const,

  ...(process.env.DATABASE_URL
    ? {
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),

  entities: ['dist/database/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],

  synchronize: !isProduction,
  logging: !isProduction,
};

export const AppDataSource = new DataSource(options);
export default AppDataSource;
