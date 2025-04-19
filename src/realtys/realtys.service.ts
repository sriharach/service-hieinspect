import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Realtys } from './realtys.entity';
import { ModelRealtys } from './dto/modelRealtys.dro';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class RealtysService {
  @InjectRepository(Realtys)
  private realtysRepository: Repository<Realtys>;

  async findAll(query: PaginateQuery) {
    return await paginate<Realtys>(query, this.realtysRepository, {
      sortableColumns: ['created_date'],
      defaultSortBy: [['created_date', 'DESC']],
      select: ['id', 'created_date', 'name', 'is_active'],
      where: {
        is_active: true,
      },
      searchableColumns: ['name'],
    });
  }

  async findAllSelect() {
    return await this.realtysRepository.find({
      order: {
        name: 'ASC'
      },
      select: ['id', 'name', 'created_date'],
      where: {
        is_active: true
      }
    })
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
