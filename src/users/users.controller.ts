import {
  Controller,
  Get,
  UseGuards,
  Body,
  Put,
  Post,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ModelUser } from './dto/model-user.dto';
import { bcryptHash } from '@/utils/hash';
import { Request as Trequest } from 'express';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
    @Request() request: Trequest,
  ) {
    const responseData = await this.userService.findAll(query);
    return {
      ...responseData,
      data: responseData.data.map((user) => {
        return {
          ...user,
          created_name: user.created_by === request.user.id ? request.user.first_name : null,
        };
      }),
    };
  }

  @Get(':id')
  findByOne(@Param('id') id: string) {
    return this.userService.findByOne(id);
  }

  @Post()
  async insert(@Body() body: ModelUser, @Request() request: Trequest) {
    body.password = await bcryptHash(body.user_name);
    body.created_date = new Date();
    body.created_by = request.user.id;
    return this.userService.upsert(body);
  }

  @Put(':id')
  async upsert(
    @Body() body: ModelUser,
    @Param('id') id: string,
    @Request() request: Trequest,
  ) {
    body.id = id;
    body.updated_date = new Date();
    body.updated_by = request.user.id;
    body.created_by = request.user.id;
    body.password = body.password ? await bcryptHash(body.password) : undefined;
    body.created_date = undefined;
    return this.userService.upsert(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
