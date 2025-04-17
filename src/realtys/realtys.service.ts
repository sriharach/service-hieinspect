import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Realtys } from './realtys.entity';
import { ModelRealtys } from './dto/modelRealtys.dro';

@Injectable()
export class RealtysService {
  @InjectRepository(Realtys)
  private realtysRepository: Repository<Realtys>;

  async findAll() {
    return await this.realtysRepository.find({
      where: { is_active: true },
      select: ['id', 'created_by', 'name', 'is_active'],
    });
  }

  async findByOne(id: string) {
    return await this.realtysRepository.findOne({
      where: { id, is_active: true },
    });
  }

  async upsert(model: ModelRealtys | ModelRealtys[]) {
    return await this.realtysRepository.upsert(model, {
      conflictPaths: [],
    });
  }

  async delete(id: string) {
    return await this.realtysRepository.delete({ id });
  }
}
