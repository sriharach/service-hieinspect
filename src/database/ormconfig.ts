import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: '.env.local' });

export const connectionSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST_DB,
  port: Number(process.env.PORT_DB) || 3306,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  migrationsRun: false,
});
