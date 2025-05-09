import { UserService } from '@src/users/services/user.service';
import { InMemoryUserRepository } from '@test/in-memory-classes/user.repository';
import { InMemoryProductProvider } from '@test/in-memory-classes/product.provider';
import { InMemoryProductRepository } from '@test/in-memory-classes/product.repository';
import { CreateUserMapper } from '@src/users/mappers/create-user.mapper';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

describe('User Service Tests', () => {
  let service: UserService;

  const userRepository = new InMemoryUserRepository();
  const productProvider = new InMemoryProductProvider();
  const productRepository = new InMemoryProductRepository();

  service = new UserService(
    userRepository,
    productProvider,
    productRepository,
    new CreateUserMapper(),
  );

  describe('Create user', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password54321',
        phoneNumber: '5585999999999',
      };
      const user = await service.createUser(userData);

      expect(user).toStrictEqual({
        id: 'f101eb55-5682-44b2-8920-6a5f99d23632',
        name: user.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      });
    });

    it('should throw a ConflitException cause email is already saved', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password54321',
        phoneNumber: '5585999999999',
      };

      await expect(service.createUser(userData)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('Update User', () => {
    it('should update a user', async () => {
      const userData = {
        name: 'Anthony',
        phoneNumber: '08007777000',
      };

      const userId = '8925f0da-0657-44d0-b275-088dac074cc0';

      const response = await service.updateUser(userId, userData);

      expect(response).toStrictEqual({ message: 'User updated successfully!' });
    });

    it('Should throw a NotFoundException cause cannot find the user', async () => {
      const userData = {
        name: 'Anthony',
        phoneNumber: '08007777000',
      };

      const userId = '7fde2e8d-094d-473e-b964-83c43be8115e';

      await expect(service.updateUser(userId, userData)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('Update Password', () => {
    it('should update a user password', async () => {
      const oldPassword = 'password123';
      const password = 'newPassword';

      const userId = '8925f0da-0657-44d0-b275-088dac074cc0';

      await expect(
        service.updateUserPassword(userId, password, oldPassword),
      ).resolves.toStrictEqual({
        message: 'User password updated successfully',
      });
    });

    it('should throw a ConflictException for wrong password', async () => {
      const oldPassword = 'ILoveRockNRoll';
      const password = 'newPassword';

      const userId = '8925f0da-0657-44d0-b275-088dac074cc0';

      await expect(
        service.updateUserPassword(userId, password, oldPassword),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw a ConflictException for same password', async () => {
      const oldPassword = 'newPassword';
      const password = 'newPassword';

      const userId = '8925f0da-0657-44d0-b275-088dac074cc0';

      await expect(
        service.updateUserPassword(userId, password, oldPassword),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('Find user by id', () => {
    it('should find a user', async () => {
      const userId = '8925f0da-0657-44d0-b275-088dac074cc0';

      const user = await service.findUserById(userId);

      expect(user.id).toBe(userId);
    });

    it('Should throw a NotFoundException', async () => {
      const userId = '3ce43c56-f7a4-43b3-b0a7-60e51f7c2462';

      await expect(service.findUserById(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('User Profile', () => {
    it('should find a user', async () => {
      const userId = '8925f0da-0657-44d0-b275-088dac074cc0';

      const user = await service.userProfile(userId);

      expect(user.id).toBe(userId);
    });
  });

  describe('Find Users', () => {
    it('should find all users', async () => {
      const users = await service.findUsers();

      expect(users.length).toBe(2);
    });
  });

  describe('Delete user', () => {
    it('should delete a user', async () => {
      const userId = 'f101eb55-5682-44b2-8920-6a5f99d23632';

      await expect(service.deleteUser(userId)).resolves.toBeUndefined();
    });
  });

  describe('Save product as favorite', () => {
    it('should save a product as favorite', async () => {
      const productId = 2;
      const userId = '8925f0da-0657-44d0-b275-088dac074cc0';

      const user = await service.saveProductAsFavorite(userId, productId);

      expect(user.favoriteProducts?.length).toBe(2);
    });

    it('should throw a NotFoundException', async () => {
      const productId = 5;
      const userId = '8925f0da-0657-44d0-b275-088dac074cc0';

      await expect(
        service.saveProductAsFavorite(userId, productId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw a BadRequestException', async () => {
      const productId = 1;
      const userId = '8925f0da-0657-44d0-b275-088dac074cc0';

      await expect(
        service.saveProductAsFavorite(userId, productId),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('Remove Product', () => {
    it('Should remove a product', async () => {
      const productId = 'f57b545b-12fc-454e-a3a1-4a46863954d6';
      const userId = '8925f0da-0657-44d0-b275-088dac074cc0';

      await expect(
        service.removeProductAsFavorite(userId, productId),
      ).resolves.toStrictEqual({ productId });
    });

    it('Should throw a NotfoundException', async () => {
      const productId = '69368a6b-f4e0-46bc-822a-19885c375f96';
      const userId = '8925f0da-0657-44d0-b275-088dac074cc0';

      await expect(
        service.removeProductAsFavorite(userId, productId),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
