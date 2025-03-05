import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        is_active: true,
        created_date: true,
        role: {
          id: true,
          name: true,
        },
      },
    });
  }

  // async findAll() {
  //   return await this.usersRepository.find();
  // }
}
