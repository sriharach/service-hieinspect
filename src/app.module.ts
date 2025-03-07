import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GlobalExceptionFilter } from './helper/errors.interceptor';
import { DatabaseConfigModule } from './database/config.module';
import { RoleModule } from './roles/roles.module';
import { RealtysModule } from './realtys/realtys.module';

@Module({
  providers: [{ provide: APP_FILTER, useClass: GlobalExceptionFilter }],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    DatabaseConfigModule,
    AuthModule,
    UsersModule,
    RoleModule,
    RealtysModule
  ],
})
export class AppModule {}
