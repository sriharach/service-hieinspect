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
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ModelRealtys } from './dto/modelRealtys.dro';
import { RealtysService } from './realtys.service';
import { Request as Trequest } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('realtys')
export class RealtysController {
  constructor(private realtysService: RealtysService) {}

  @Get()
  async findAll(@Request() request: Trequest) {
    const responseData = await this.realtysService.findAll();
    return responseData.map((realty) => {
      return {
        ...realty,
        created_name: request.user.id === realty.created_by ? request.user.first_name : null
      }
    })
  }

  @Get(':id')
  findByOne(@Param('id') id: string) {
    return this.realtysService.findByOne(id);
  }

  @Post()
  async insert(@Body() body: ModelRealtys, @Request() request: Trequest) {
    body.created_by = request.user.id;
    body.created_date = new Date();
    return this.realtysService.upsert(body);
  }

  @Put(':id')
  async upsert(
    @Body() body: ModelRealtys,
    @Param('id') id: string,
    @Request() request: Trequest,
  ) {
    body.id = id;
    body.updated_by = request.user.id;
    body.updated_date = new Date();
    body.created_by = request.user.id;
    return this.realtysService.upsert(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.realtysService.delete(id);
  }
}
