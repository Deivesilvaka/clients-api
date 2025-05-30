export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
}

export interface IRating {
  rate: number;
  count: number;
}

export interface IProductProvider {
  getProducts(): Promise<IProduct[]>;
  getProductById(productId: number): Promise<IProduct>;
}
