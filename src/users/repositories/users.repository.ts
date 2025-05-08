import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '@src/users/entities/user.entity';
import { CreateUserDto } from '@src/users/dtos/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async findUserById(
    id: string,
    relations?: string[],
  ): Promise<UsersEntity | null> {
    return this.userRepository.findOne({
      where: { id },
      relations,
      relationLoadStrategy: 'query',
    });
  }

  async findByIdAndPassword(
    id: string,
    password: string,
  ): Promise<UsersEntity | null> {
    return this.userRepository.findOne({ where: { id, password } });
  }

  async findUserByEmail(
    email: string,
    findPassword: boolean = false,
  ): Promise<UsersEntity | null> {
    return this.userRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        phoneNumber: true,
        password: findPassword,
      },
    });
  }

  async createUser(userData: CreateUserDto): Promise<UsersEntity> {
    return this.userRepository.save(userData);
  }

  async save(userData: UsersEntity): Promise<UsersEntity> {
    return this.userRepository.save(userData);
  }

  async findUsers() {
    return this.userRepository.find({
      relations: ['favoriteProducts', 'favoriteProducts.rating'],
      relationLoadStrategy: 'query',
    });
  }

  async softDelete(id: string) {
    await this.userRepository.softDelete(id);
  }
}
