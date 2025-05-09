import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IProduct } from '@src/shared/providers/products/interfaces/product.interface';
import { CLOUDFLARE_STATUS_ERROR } from '@src/shared/providers/products/constants/constants';

@Injectable()
export class ProductProvider {
  constructor(private readonly httpService: HttpService) {}

  async getProducts(): Promise<IProduct[]> {
    try {
      const { data: response } = await firstValueFrom(
        this.httpService.get(`/`),
      );

      return response;
    } catch (err) {
      throw new InternalServerErrorException('Cannot get products!');
    }
  }

  async getProductById(id: number): Promise<IProduct[]> {
    try {
      const { data: response } = await firstValueFrom(
        this.httpService.get(`/${id}`),
      );

      return response;
    } catch (err) {
      throw new HttpException('Platform is down!', CLOUDFLARE_STATUS_ERROR);
    }
  }
}
