import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestUserLogin } from './dto/auth.login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '@/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async validateUser(password: string, password_hash: string) {
    const isMatch = bcrypt.compareSync(password, password_hash);
    if (isMatch) return true;
    throw new HttpException('Password Not Match', HttpStatus.BAD_REQUEST);
  }

  async findByUser(username: string) {
    const byUser = await this.usersService.findByUsername(username);
    if (byUser) return byUser;
    throw new HttpException('Not found user.', HttpStatus.NOT_FOUND);
  }

  async login(req: RequestUserLogin) {
    const found = await this.findByUser(req.username);
    await this.validateUser(req.password, found.password);

    const modelUser = {
      id: found.id,
      username: found.user_name,
      first_name: found.first_name,
      last_name: found.last_name,
      is_active: found.is_active,
      role_name: found.role.name,
    };

    return {
      access_token: await this.jwtService.signAsync(modelUser),
      refresh_token: await this.jwtService.signAsync(modelUser, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      }),
    };
  }
}
