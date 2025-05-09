import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { STATUS_CODES } from 'http';
import { Public } from '@src/auth/decorators/public.decorator';
import { ProductsService } from '@src/products/services/products.service';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  @Public()
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  @ApiInternalServerErrorResponse({
    description: STATUS_CODES[HttpStatus.INTERNAL_SERVER_ERROR],
  })
  async getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':productId')
  @Public()
  @ApiOperation({ summary: 'Get product by id' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  @ApiNotFoundResponse({ description: STATUS_CODES[HttpStatus.NOT_FOUND] })
  async getProductById(@Param('productId') productId: number) {
    return this.productsService.getProductById(productId);
  }
}
