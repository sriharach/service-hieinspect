import { Roles } from '@/roles/roles.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  role_id: string;

  @Column('text')
  user_name: string;

  @Column('text')
  password: string;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column({ default: true, type: 'boolean' })
  is_active: boolean;

  @Column('timestamp')
  created_date: Date;

  @Column('uuid')
  created_by: string;

  @Column('timestamp')
  updated_date: Date;

  @Column('uuid')
  updated_by: string;

  @OneToOne(() => Roles)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Roles;
}
