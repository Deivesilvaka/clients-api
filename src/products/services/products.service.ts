import { Inject, Injectable } from '@nestjs/common';
import { IProductProvider } from '@src/shared/providers/products/interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductProvider')
    private readonly productProvider: IProductProvider,
  ) {}
  async getProducts() {
    return this.productProvider.getProducts();
  }

  async getProductById(productId: number) {
    return this.productProvider.getProductById(productId);
  }
}
