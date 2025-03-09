import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ModelHouseService } from '@/modelHouse/modelHouse.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelHouse } from '@/modelHouse/modelHouse.entity';
import { ModelHouseImage } from '@/modelHouseImage/modelHouseImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModelHouse])],
  controllers: [UploadController],
  providers: [ModelHouseService],
  exports: [ModelHouseService],
})
export class UploadModule {}
