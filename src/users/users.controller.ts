import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
