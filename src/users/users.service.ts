import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelUser } from './dto/model-user.dto';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;

  async findAll() {
    return await this.usersRepository.find({
      relations: ['role'],
      select: {
        id: true,
        user_name: true,
        first_name: true,
        last_name: true,
        is_active: true,
        created_date: true,
        role: {
          id: true,
          name: true,
        },
      },
      where: { is_active: true },
    });
  }

  async findByOne(user_id: string) {
    return await this.usersRepository.findOne({
      where: { id: user_id },
      relations: ['role'],
      select: {
        id: true,
        user_name: true,
        first_name: true,
        last_name: true,
        is_active: true,
        role: {
          id: true,
          name: true,
        },
      },
    });
  }

  async upsert(model: ModelUser | ModelUser[]) {
    return await this.usersRepository.upsert(model, {
      conflictPaths: ['user_name'],
    });
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: { user_name: username },
      relations: ['role'],
      select: {
        id: true,
        user_name: true,
        first_name: true,
        password: true,
        last_name: true,
        is_active: true,
        created_date: true,
        role: {
          id: true,
          name: true,
        },
      },
    });
  }

  async delete(id: string) {
    return await this.usersRepository.delete({ id });
  }
}
