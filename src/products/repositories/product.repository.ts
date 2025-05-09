import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '@src/products/entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async saveFavorite(
    productData: Partial<ProductEntity>,
    userId: string,
  ): Promise<ProductEntity> {
    const product = await this.productsRepository.save(productData);

    const queryRunner =
      this.productsRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const exists = await queryRunner.query(
        `SELECT 1 FROM user_favorite_products 
         WHERE user_id = $1 AND product_id = $2`,
        [userId, product.id],
      );

      if (!exists.length) {
        await queryRunner.query(
          `INSERT INTO user_favorite_products (user_id, product_id)
           VALUES ($1, $2)`,
          [userId, product.id],
        );
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Cannot save product!');
      }
    }
    return product;
  }

  async removeFavoriteProduct(
    userId: string,
    productId: string,
  ): Promise<string> {
    const queryRunner =
      this.productsRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const exists = await queryRunner.query(
        `SELECT 1 FROM user_favorite_products 
             WHERE user_id = $1 AND product_id = $2`,
        [userId, productId],
      );

      if (exists.length > 0) {
        await queryRunner.query(
          `DELETE FROM user_favorite_products 
                 WHERE user_id = $1 AND product_id = $2`,
          [userId, productId],
        );
      }

      await queryRunner.manager.softDelete(ProductEntity, productId);

      await queryRunner.commitTransaction();
    } catch (err) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Cannot delete product!');
      }
    }

    return productId;
  }
}
