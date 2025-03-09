import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelHouseImage } from './modelHouseImage.entity';


@Injectable()
export class ModelHouseImageService {
  @InjectRepository(ModelHouseImage)
  private modelHouseImageReposity: Repository<ModelHouseImage>;

  async findAll() {
    return await this.modelHouseImageReposity.find({
        relations: {
            house: true
        }
    });
  }

  async findByOne(id: string) {
    return await this.modelHouseImageReposity.findOne({
      relations: {
        house: true
      }
    });
  }

  async upsert(model: ModelHouseImage[]) {
    return await this.modelHouseImageReposity.upsert(model, {
      conflictPaths: [],
    });
  }

  async delete(id: string) {
    return await this.modelHouseImageReposity.delete({ id });
  }
}
