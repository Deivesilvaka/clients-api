import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@src/products/entities/product.entity';
import { RatingEntity } from '@src/products/entities/rating.entity';
import { UserModule } from '@src/users/users.module';
import { ProductController } from '@src/products/controllers/product.controller';
import { ProductProviderModule } from '@src/shared/providers/products/product.provider.module';
import { ProductsService } from '@src/products/services/products.service';
import { ProductRepository } from '@src/products/repositories/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, RatingEntity]),
    UserModule,
    ProductProviderModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductsService,
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
  ],
  exports: ['ProductRepository'],
})
export class ProductModule {}
