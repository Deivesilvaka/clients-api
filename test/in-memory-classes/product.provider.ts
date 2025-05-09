import {
  IProduct,
  IProductProvider,
} from '@src/shared/providers/products/interfaces/product.interface';

export class InMemoryProductProvider implements IProductProvider {
  private products = [
    {
      id: 1,
      title: 'product 1',
      price: 35,
      description: 'product description',
      category: 'product category',
      image: 'product.jpg',
      rating: {
        rate: 4.5,
        count: 10,
      },
    },
    {
      id: 2,
      title: 'product 2',
      price: 35,
      description: 'product description',
      category: 'product category',
      image: 'product-two.jpg',
      rating: {
        rate: 4.9,
        count: 30,
      },
    },
  ];
  async getProducts(): Promise<IProduct[]> {
    return this.products;
  }
  async getProductById(productId: number): Promise<IProduct> {
    return this.products.find(
      (product) => product.id === productId,
    ) as IProduct;
  }
}
