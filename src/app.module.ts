import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GlobalExceptionFilter } from './helper/errors.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthService } from './auth/auth.service';
import { AccessTokenStrategy } from './auth/jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseConfigModule } from './database/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    // AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
