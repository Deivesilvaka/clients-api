import { UsersEntity } from '@src/users/entities/user.entity';
import { CreateUserDto } from '@src/users/dtos/create-user.dto';

export interface IUserRepository {
  findUserById(id: string, relations?: string[]): Promise<UsersEntity | null>;

  findUsers(): Promise<UsersEntity[]>;

  findByIdAndPassword(
    id: string,
    password: string,
  ): Promise<UsersEntity | null>;

  findUserByEmail(
    email: string,
    findPassword: boolean,
  ): Promise<UsersEntity | null>;

  createUser(userData: CreateUserDto): Promise<UsersEntity>;

  save(userData: UsersEntity): Promise<UsersEntity>;

  softDelete(id: string): Promise<void>;
}
