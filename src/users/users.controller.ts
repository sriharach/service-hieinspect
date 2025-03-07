import {
  Controller,
  Get,
  UseGuards,
  Body,
  Put,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ModelUser } from './dto/model-user.dto';
import { bcryptHash } from '@/utils/hash';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findByOne(@Param('id') id: string) {
    return this.userService.findByOne(id);
  }

  @Post()
  async insert(@Body() body: ModelUser) {
    body.password = await bcryptHash(body.password);
    return this.userService.upsert(body);
  }

  @Put(':id')
  async upsert(@Body() body: ModelUser, @Param('id') id: string) {
    body.id = id;
    if (body.password) {
      body.password = await bcryptHash(body.password);
    }
    return this.userService.upsert(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
