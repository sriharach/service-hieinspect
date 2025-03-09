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
import { Request as TRequest } from 'express';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ModelCategories } from './dto/modelCategories.dto';
import { categoriesHouseService } from './categoriesHouse.service';

@UseGuards(JwtAuthGuard)
@Controller('category_house')
export class CategoriesController {
  constructor(private categoriesHouseService: categoriesHouseService) {}

  @Get()
  findAll() {
    return this.categoriesHouseService.findAll();
  }

  @Get(':id')
  findByOne(@Param('id') id: string) {
    return this.categoriesHouseService.findByOne(id);
  }

  @Post()
  async insert(@Body() body: ModelCategories, @Request() request: TRequest) {
    body.created_by = request.user.id;
    body.created_date = new Date();
    return this.categoriesHouseService.upsert(body);
  }

  @Put(':id')
  async upsert(
    @Body() body: ModelCategories,
    @Param('id') id: string,
    @Request() request: TRequest,
  ) {
    body.id = id;
    body.updated_by = request.user.id;
    body.updated_date = new Date();
    return this.categoriesHouseService.upsert(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesHouseService.delete(id);
  }
}
