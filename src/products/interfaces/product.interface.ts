import { ProductEntity } from '@src/products/entities/product.entity';
export interface IProductRepository {
  saveFavorite(
    productData: Partial<ProductEntity>,
    userId: string,
  ): Promise<ProductEntity>;

  removeFavoriteProduct(userId: string, productId: string): Promise<string>;
}
