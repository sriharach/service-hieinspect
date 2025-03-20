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
import { rmDirectionPath, rmFilePath } from '@/utils/directionPath';
import { InjectRepository } from '@nestjs/typeorm';
import { ModelHouseImage } from '@/modelHouseImage/modelHouseImage.entity';
import { Repository } from 'typeorm';

@UseGuards(JwtAuthGuard)
@Controller('model_house')
export class ModelHouseController {
  constructor(
    private modelHouseService: ModelHouseService,

    @InjectRepository(ModelHouseImage)
    private modelHouseImageReposity: Repository<ModelHouseImage>,
  ) {}

  protected getImageInspect(data) {
    const uploadDir = path.join(path.resolve('./'), 'src', 'uploads-all');
    return {
      ...data,
      data: data.data.map((val) => {
        return {
          ...val,
          house_images: val.house_images.map((h_img) => {
            if (h_img.path_name && h_img.file_name) {
              const file = fs.readFileSync(
                path.join(uploadDir, h_img.path_name),
              );
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
      }),
    };
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    const dataFindAll = await this.modelHouseService.findAll(query);
    return this.getImageInspect(dataFindAll);
  }

  @Get(':id')
  async findByOne(@Param('id') id: string) {
    const responseData = await this.modelHouseService.findByOne(id);
    const uploadDir = path.join(path.resolve('./'), 'src', 'uploads-all');

    return {
      ...responseData,
      house_images: responseData.house_images.map((h_img) => {
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
    try {
      body.id = id;
      body.updated_by = request.user.id;
      body.updated_date = new Date();
      body.house_images_upload =
        body.house_images_upload.length > 0
          ? body.house_images_upload
          : undefined;

      // ถ้ามีการ exclude ให้ลบไฟล์ออก และลบชื่อ database
      if (body.exclude_filename) {
        if (body.exclude_filename.length > 0) {
          for (let index = 0; index < body.exclude_filename.length; index++) {
            const filename = body.exclude_filename[index];
            rmFilePath(body.code_house, filename); // ลบรูปออก
            await this.modelHouseImageReposity.delete({ file_name: filename });
          }
        }
      }

      return this.modelHouseService.upsert(body);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const reponseById = await this.modelHouseService.findByOne(id);

    if (reponseById.house_images.length > 0) {
      rmDirectionPath(reponseById.code_house);
    }

    return this.modelHouseService.delete(id);
  }
}
