import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductProvider } from '@src/shared/providers/products/product.provider';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('PRODUCTS_API'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'ProductProvider',
      useClass: ProductProvider,
    },
  ],
  exports: ['ProductProvider'],
})
export class ProductProviderModule {}
