import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RequestUserLogin } from '@/types/users';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // validateUser(username: string, pass: string) {
  //   return this.usersService.validateUser(username, pass);
  // }

  // login(user: RequestUserLogin) {
  //   const validateUser = this.validateUser(user.username, user.password);
  //   if (validateUser) {
  //     return { access_token: this.jwtService.sign(user) };
  //   } else {
  //     throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  //   }
  // }

  auth() {
    return 'Hello auth!';
  }
}
