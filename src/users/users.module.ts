import { Module } from '@nestjs/common';
import { UsersController } from '@src/users/controllers/users.controller';
import { ThrottlerProvider } from '@src/shared/providers/throttler/throttler.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '@src/users/entities/user.entity';
import { UserService } from '@src/users/services/user.service';
import { UserRepository } from '@src/users/repositories/users.repository';
import { CreateUserMapper } from '@src/users/mappers/create-user.mapper';
import { ProductProviderModule } from '@src/shared/providers/products/product.provider.module';
import { ProductRepository } from '@src/products/repositories/product.repository';
import { ProductEntity } from '@src/products/entities/product.entity';
import { RatingEntity } from '@src/products/entities/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, ProductEntity, RatingEntity]),
    ProductProviderModule,
  ],
  controllers: [UsersController],
  providers: [
    ThrottlerProvider,
    { provide: 'UserRepository', useClass: UserRepository },
    CreateUserMapper,
    UserService,
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
  ],
  exports: [CreateUserMapper, 'UserRepository'],
})
export class UserModule {}
