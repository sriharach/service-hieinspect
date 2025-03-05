import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
