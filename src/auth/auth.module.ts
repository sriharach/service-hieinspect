import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './jwt.strategy';
import { UsersService } from '@/users/users.service';
import { UsersModule } from '@/users/users.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ConfigService, AccessTokenStrategy],
  exports: [AuthService, UsersService, ConfigService],
})
export class AuthModule {}
