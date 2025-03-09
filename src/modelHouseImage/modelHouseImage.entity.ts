import { ModelHouse } from '@/modelHouse/modelHouse.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('model_house_images')
export class ModelHouseImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  model_house_id: string;

  @Column()
  file_name: string;

  @Column()
  path_name: string;

  @Column()
  created_date: Date;

  @Column()
  created_by: string;

  @Column()
  updated_date: Date;

  @Column()
  updated_by: string;

  @ManyToOne(() => ModelHouse, (house) => house)
  @JoinColumn({ name: 'model_house_id', referencedColumnName: 'id' })
  house: ModelHouse;
}
