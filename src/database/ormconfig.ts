import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const connectionSource = new DataSource({
  type: 'mysql',
  host: configService.get('HOST_DB'),
  port: 3306,
  username: configService.get('USERNAME_DB'),
  password: configService.get('PASSWORD_DB'),
  database: configService.get('DATABASE_DB'),
  entities: ['**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false, // ปิดไว้เพื่อป้องกันการเปลี่ยนแปลงโครงสร้างโดยอัตโนมัติ
  migrationsRun: false, // ให้ migration ทำงานอัตโนมัติทุกครั้งที่รันแอป
});
