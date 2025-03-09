import { ModelHouseImage } from '@/modelHouseImage/modelHouseImage.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('model_house')
export class ModelHouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category_house_id: string;

  @Column()
  service_category_house_id: string;

  @Column()
  realitys_id: string;

  @Column()
  name: string;

  @Column()
  is_active: boolean;

  @Column()
  created_date: Date;

  @Column()
  created_by: string;

  @Column()
  updated_date: Date;

  @Column()
  updated_by: string;

  @Column()
  code_house: string

  @OneToMany(() => ModelHouseImage, (house) => house.house)
  @JoinColumn({ referencedColumnName: 'model_house_id' })
  house_images: ModelHouseImage[];
}
