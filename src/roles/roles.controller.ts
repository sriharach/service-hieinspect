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
import { RoleService } from './roles.serice';
import { ModelRoles } from './dto/modelRoles.dto';

@UseGuards(JwtAuthGuard)
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findByOne(@Param('id') id: string) {
    return this.roleService.findByOne(id);
  }

  @Post()
  async insert(@Body() body: ModelRoles) {
    return this.roleService.upsert(body);
  }

  @Put(':id')
  async upsert(@Body() body: ModelRoles, @Param('id') id: string) {
    body.id = id;
    return this.roleService.upsert(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
