import { IUserRepository } from '@src/users/interfaces/user.repositoty.interface';
import { CreateUserDto } from '../../src/users/dtos/create-user.dto';
import { UsersEntity } from '@src/users/entities/user.entity';
import { UserMock } from '@test/mocks/user';

export class InMemoryUserRepository implements IUserRepository {
  private users: UsersEntity[] = [UserMock];

  async findUserById(
    id: string,
    relations?: string[],
  ): Promise<UsersEntity | null> {
    relations;
    return this.users.find((user) => user.id === id) ?? null;
  }
  async findUsers(): Promise<UsersEntity[]> {
    return this.users;
  }

  async findByIdAndPassword(
    id: string,
    password: string,
  ): Promise<UsersEntity | null> {
    return (
      this.users.find((user) => user.id === id && user.password === password) ??
      null
    );
  }

  async findUserByEmail(
    email: string,
    findPassword: boolean,
  ): Promise<UsersEntity | null> {
    findPassword;
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async createUser(userData: CreateUserDto): Promise<UsersEntity> {
    const entity = {
      ...userData,
      id: 'f101eb55-5682-44b2-8920-6a5f99d23632',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      favoriteProducts: [],
    };

    this.users.push(entity);

    return entity;
  }

  async save(userData: UsersEntity): Promise<UsersEntity> {
    this.users = this.users.map((user) => {
      if (user.id === userData.id) {
        return userData;
      }
      return user;
    });

    return userData;
  }

  async softDelete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
