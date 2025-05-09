import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '@src/users/entities/user.entity';
import { ProductEntity } from '@src/products/entities/product.entity';
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
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const exists = await queryRunner.query(
        `SELECT product_id FROM user_favorite_products WHERE user_id = $1`,
        [id],
      );

      if (exists.length > 0) {
        await queryRunner.query(
          `DELETE FROM user_favorite_products WHERE user_id = $1`,
          [id],
        );
      }

      await queryRunner.manager.softDelete(
        ProductEntity,
        exists.map((product: { product_id: string }) => product.product_id),
      );
      await queryRunner.manager.softDelete(UsersEntity, id);

      await queryRunner.commitTransaction();
    } catch (err) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Cannot delete!');
      }
    }
  }
}
