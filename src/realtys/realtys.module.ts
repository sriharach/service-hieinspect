import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Realtys } from './realtys.entity';
import { RealtysController } from './realtys.comtroller';
import { RealtysService } from './realtys.service';

@Module({
  imports: [TypeOrmModule.forFeature([Realtys])],
  controllers: [RealtysController],
  providers: [RealtysService],
  exports: [RealtysService],
})
export class RealtysModule {}
