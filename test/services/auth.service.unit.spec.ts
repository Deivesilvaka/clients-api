import { AuthService } from '@src/auth/services/auth.service';
import { InMemoryUserRepository } from '@test/in-memory-classes/user.repository';
import { CreateUserMapper } from '@src/users/mappers/create-user.mapper';
import { JwtService } from '@nestjs/jwt';
import { UserMock } from '@test/mocks/user';
import { encryptPassword } from '@src/shared/helpers/password.helper';

describe('Auth Service', () => {
  let service: AuthService;

  process.env.JWT_SECRET = 'test';
  const keyMock = 'keeeeeeeeeeey';

  const JwtServiceMock = {
    sign: jest.fn().mockReturnValue(keyMock),
  } as unknown as jest.Mocked<JwtService>;

  const userRepository = new InMemoryUserRepository();

  service = new AuthService(
    userRepository,
    new CreateUserMapper(),
    JwtServiceMock,
  );

  describe('Validate User', () => {
    it('Should return a user info', async () => {
      const data = {
        email: 'john.doe@example.com',
        password: 'newPassword',
      };

      UserMock.password = encryptPassword(data.password);

      const user = await service.validateUser(data);

      expect(user).toStrictEqual({
        email: 'john.doe@example.com',
        id: '8925f0da-0657-44d0-b275-088dac074cc0',
        name: 'John Doe',
        phoneNumber: '5523912345678',
      });
    });

    it('Cannot find user', async () => {
      await expect(
        service.validateUser({
          email: 'johnny.doe@example.com',
          password: 'newPassword',
        }),
      ).resolves.toBeNull();
    });

    it('Password dont match', async () => {
      await expect(
        service.validateUser({
          email: 'john.doe@example.com',
          password: 'wrongPassword',
        }),
      ).resolves.toBeNull();
    });
  });

  describe('Login', () => {
    it('Should return a token', async () => {
      await expect(
        service.login({
          email: 'john.doe@example.com',
          sub: {
            id: '8925f0da-0657-44d0-b275-088dac074cc0',
          },
        }),
      ).resolves.toStrictEqual({
        access_token: keyMock,
      });
    });
  });
});
