import { UsersEntity } from '@src/users/entities/user.entity';

export const UserMock: UsersEntity = {
  id: '8925f0da-0657-44d0-b275-088dac074cc0',
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123',
  phoneNumber: '5523912345678',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  favoriteProducts: [
    {
      id: 'f57b545b-12fc-454e-a3a1-4a46863954d6',
      title: 'product 1',
      price: 35,
      externalProductId: 1,
      description: 'product description',
      category: 'product category',
      image: 'product.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    },
  ],
};
