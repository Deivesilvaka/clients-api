import { ProductsService } from '@src/products/services/products.service';
import { InMemoryProductProvider } from '@test/in-memory-classes/product.provider';

describe('Product Service', () => {
  let service: ProductsService;

  const productProvider = new InMemoryProductProvider();

  service = new ProductsService(productProvider);

  describe('Get Products', () => {
    it('Should return two products', async () => {
      const products = await service.getProducts();
      expect(products.length).toBe(2);
    });

    it('Should return the specific product of the id', async () => {
      const productId = 1;

      const product = await service.getProductById(productId);
      expect(product.id).toBe(productId);
    });
  });
});
