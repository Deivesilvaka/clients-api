import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '@src/users/dtos/create-user.dto';
import { encryptPassword } from '@src/shared/helpers/password.helper';
import { CreateUserMapper } from '@src/users/mappers/create-user.mapper';
import { IUserRepository } from '@src/users/interfaces/user.repositoty.interface';
import { UpdateUserDto } from '@src/users/dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('userRepository')
    private readonly userRepository: IUserRepository,
    private readonly createUserMapper: CreateUserMapper,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    let user = await this.userRepository.findUserByEmail(
      createUserDto.email,
      false,
    );

    if (user) {
      throw new ConflictException('User with this email already exists!');
    }

    createUserDto.password = encryptPassword(createUserDto.password);

    user = await this.userRepository.createUser(createUserDto);

    return this.createUserMapper.map(user);
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new ConflictException('User not found');
    }

    await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return { message: 'User updated successfully!' };
  }

  async updateUserPassword(
    userId: string,
    password: string,
    oldPassword: string,
  ) {
    const user = await this.userRepository.findByIdAndPassword(
      userId,
      oldPassword,
    );

    if (!user) {
      throw new ConflictException('Wrong password!');
    }

    if (oldPassword === password) {
      throw new ConflictException('Both passwords are the same!');
    }

    await this.userRepository.save({
      ...user,
      password,
    });

    return {
      message: 'User password updated successfully',
    };
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findUserById(id, [
      'favoriteProducts',
      'favoriteProducts.rating',
    ]);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async userProfile(id: string) {
    return this.findUserById(id);
  }

  async findUsers() {
    return this.userRepository.findUsers();
  }

  async deleteUser(userId: string) {
    await this.findUserById(userId);

    return this.userRepository.softDelete(userId);
  }
}
