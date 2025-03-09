import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesHouse } from './categoriesHouse.entity';
import { CategoriesController } from './categoriesHouse.controller';
import { categoriesHouseService } from './categoriesHouse.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesHouse])],
  controllers: [CategoriesController],
  providers: [categoriesHouseService],
  exports: [categoriesHouseService],
})
export class CategoriesHouseModule {}
