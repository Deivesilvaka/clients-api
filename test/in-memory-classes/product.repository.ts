import { IProductRepository } from '@src/products/interfaces/product.interface';
import { ProductEntity } from '../../src/products/entities/product.entity';

export class InMemoryProductRepository implements IProductRepository {
  private products = [
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
  ];
  async saveFavorite(
    productData: Partial<ProductEntity>,
    userId: string,
  ): Promise<ProductEntity> {
    userId;
    const product = {
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      id: 'b738c7be-17a6-4c33-830a-fbebb662d2b0',
      title: productData.title ?? '',
      price: productData.price ?? 0,
      externalProductId: productData?.externalProductId ?? 0,
      category: productData?.category ?? '',
      image: productData?.image ?? '',
      description: productData?.description ?? '',
    };
    this.products.push(product);

    return productData as ProductEntity;
  }
  async removeFavoriteProduct(
    userId: string,
    productId: string,
  ): Promise<string> {
    userId;
    return productId;
  }
}
