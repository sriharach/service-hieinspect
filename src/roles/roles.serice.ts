import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';
import { ModelRoles } from './dto/modelRoles.dto';

@Injectable()
export class RoleService {
  @InjectRepository(Roles)
  private roleRepository: Repository<Roles>;

  async findAll() {
    return await this.roleRepository.find({ where: { is_active: true } });
  }

  async findByOne(id: string) {
    return await this.roleRepository.findOne({
      where: { id, is_active: true },
    });
  }

  async upsert(model: ModelRoles | ModelRoles[]) {
    return await this.roleRepository.upsert(model, {
      conflictPaths: ['name'],
    });
  }

  async delete(id: string) {
    return await this.roleRepository.delete({ id });
  }
}
