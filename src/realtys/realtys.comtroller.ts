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
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ModelRealtys } from './dto/modelRealtys.dro';
import { RealtysService } from './realtys.service';

@UseGuards(JwtAuthGuard)
@Controller('realtys')
export class RealtysController {
  constructor(private realtysService: RealtysService) {}

  @Get()
  findAll() {
    return this.realtysService.findAll();
  }

  @Get(':id')
  findByOne(@Param('id') id: string) {
    return this.realtysService.findByOne(id);
  }

  @Post()
  async insert(@Body() body: ModelRealtys) {
    return this.realtysService.upsert(body);
  }

  @Put(':id')
  async upsert(@Body() body: ModelRealtys, @Param('id') id: string) {
    body.id = id;
    return this.realtysService.upsert(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.realtysService.delete(id);
  }
}
