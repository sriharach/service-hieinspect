import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestUserLogin } from '../types/users';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Get()
  auth() {
    return this.authService.auth();
  }

  // @Post('login')
  // login(@Body() req: RequestUserLogin) {
  //   return this.authService.login(req);
  // }
}
