import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const connectionSource = new DataSource({
  type: 'mysql',
  host: '27.254.144.16',
  port: 3306,
  username:'hieinsp1_sriharat',
  password: '!Folksong7154',
  database: 'hiespect_db',
  entities: ['**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false, // ปิดไว้เพื่อป้องกันการเปลี่ยนแปลงโครงสร้างโดยอัตโนมัติ
  migrationsRun: false, // ให้ migration ทำงานอัตโนมัติทุกครั้งที่รันแอป
});
