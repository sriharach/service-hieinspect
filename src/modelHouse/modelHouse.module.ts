import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelHouse } from './modelHouse.entity';
import { ModelHouseController } from './modelHouse.controller';
import { ModelHouseService } from './modelHouse.service';
import { ModelHouseImage } from '@/modelHouseImage/modelHouseImage.entity';
import { ModelHouseImageService } from '@/modelHouseImage/modelHouseImage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModelHouse, ModelHouseImage])],
  controllers: [ModelHouseController],
  providers: [ModelHouseService, ModelHouseImageService],
  exports: [ModelHouseService, ModelHouseImageService],
})
export class ModelHouseModule {}
