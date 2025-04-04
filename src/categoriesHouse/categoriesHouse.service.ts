import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesHouse } from './categoriesHouse.entity';
import { ModelCategories } from './dto/modelCategories.dto';

@Injectable()
export class categoriesHouseService {
  @InjectRepository(CategoriesHouse)
  private categoriesRepository: Repository<CategoriesHouse>;

  async findAll() {
    return await this.categoriesRepository.find({
      where: { is_active: true },
      select: ['id', 'name', 'created_by'],
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
