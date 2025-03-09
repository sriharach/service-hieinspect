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
import { ModelHouse } from './dto/modelHouse.dto';
import { ModelHouseService } from './modelHouse.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import * as path from 'path';
import * as fs from 'fs';
import { getRandomUniqueNumbersUsingFilter } from '@/utils/rendomUnique';

@UseGuards(JwtAuthGuard)
@Controller('model_house')
export class ModelHouseController {
  constructor(private modelHouseService: ModelHouseService) {}

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    const dataFindAll = await this.modelHouseService.findAll(query);
    const uploadDir = path.join(path.resolve('./'), 'src', 'uploads-all');
    return dataFindAll.data.map((val) => {
      return {
        ...val,
        house_images: val.house_images.map((h_img) => {
          if (h_img.path_name && h_img.file_name) {
            const file = fs.readFileSync(path.join(uploadDir, h_img.path_name));
            const base64 = file.toString('base64');
            const splitType = h_img.file_name.split('.')[1];
            return {
              ...h_img,
              image: `data:image/${splitType};base64,${base64}`,
            };
          }
          return {
            ...h_img,
            image: null,
          };
        }),
      };
    });
  }

  @Get(':id')
  findByOne(@Param('id') id: string) {
    return this.modelHouseService.findByOne(id);
  }

  @Post()
  async insert(@Body() body: ModelHouse, @Request() request: TRequest) {
    body.created_by = request.user.id;
    body.created_date = new Date();

    const basePathHouse = `hiehouse-${getRandomUniqueNumbersUsingFilter(1, 90, 4).join('')}`;
    body.code_house = basePathHouse;

    const response = await this.modelHouseService.upsert(body);
    return {
      id: response.identifiers[0].id,
      code_house: basePathHouse,
    };
  }

  @Put(':id')
  async upsert(
    @Body() body: ModelHouse,
    @Param('id') id: string,
    @Request() request: TRequest,
  ) {
    body.id = id;
    body.updated_by = request.user.id;
    body.updated_date = new Date();
    return this.modelHouseService.upsert(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.modelHouseService.delete(id);
  }
}
