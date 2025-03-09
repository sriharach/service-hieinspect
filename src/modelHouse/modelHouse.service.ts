import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelHouse } from './modelHouse.entity';
import { ModelHouse as ModelHouseDTO } from './dto/modelHouse.dto';
import { ModelHouseImage } from '@/modelHouseImage/modelHouseImage.entity';
import { v4 as uuid } from 'uuid';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class ModelHouseService {
  @InjectRepository(ModelHouse)
  private modelHouseReposity: Repository<ModelHouse>;

  async findAll(query: PaginateQuery) {
    return await paginate<ModelHouse>(query, this.modelHouseReposity, {
      sortableColumns: ['created_date'],
      defaultSortBy: [['created_date', 'DESC']],
      relations: ['house_images'],
      where: { is_active: true },
    });
  }

  async findByOne(id: string) {
    return await this.modelHouseReposity.findOne({
      relations: {
        house_images: true,
      },
      where: { id, is_active: true },
    });
  }

  async findByCode(code_id: string) {
    return await this.modelHouseReposity.findOne({
      relations: {
        house_images: true,
      },
      where: { code_house: code_id, is_active: true },
    });
  }

  async upsert(model: ModelHouseDTO) {
    console.log('model', model)
    const house_id = uuid();
    model.id = model.id || house_id;

    return this.modelHouseReposity.manager.transaction(
      async (transactionalEntityManager) => {
        if (model.house_images_upload.length > 0) {
          await transactionalEntityManager.insert(
            ModelHouseImage,
            model.house_images_upload.map((image) => {
              return {
                ...image,
                model_house_id: model.id,
                created_by: model.created_by || undefined,
                created_date: model.created_date || undefined,
                updated_by: model.updated_by,
                updated_date: model.updated_date,
              };
            }),
          );
        }
        return await transactionalEntityManager.upsert(ModelHouse, model, {
          conflictPaths: [],
        });
      },
    );
  }

  async delete(id: string) {
    return await this.modelHouseReposity.delete({ id });
  }
}
