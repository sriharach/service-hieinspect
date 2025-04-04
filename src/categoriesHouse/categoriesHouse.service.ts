import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesHouse } from './categoriesHouse.entity';
import { ModelCategories } from './dto/modelCategories.dto';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class categoriesHouseService {
  @InjectRepository(CategoriesHouse)
  private categoriesRepository: Repository<CategoriesHouse>;

  async findAllSelect() {
    return await this.categoriesRepository.find({ where: { is_active: true },  select: ['id', 'name', 'created_by'] });
  }

  async findAll(query: PaginateQuery) {
    return await paginate<CategoriesHouse>(query, this.categoriesRepository, {
      sortableColumns: ['created_date'],
      defaultSortBy: [['created_date', 'DESC']],
      where: {
        is_active: true
      },
      searchableColumns: ['name']
    });
  }

  async findByOne(id: string) {
    return await this.categoriesRepository.findOne({
      where: { id, is_active: true },
      select: ['id', 'name', 'created_by'],
    });
  }

  async upsert(model: ModelCategories | ModelCategories[]) {
    return await this.categoriesRepository.upsert(model, {
      conflictPaths: [],
    });
  }

  async delete(id: string) {
    return await this.categoriesRepository.delete({ id });
  }
}
