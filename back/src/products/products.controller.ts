import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Body,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginatedResult } from 'src/interfaces/paginatedInterface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Products } from 'src/entitys/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/seeder')
  async getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<PaginatedResult<Products>> {
    const products = await this.productsService.getProducts(page, limit);
    if (!products) {
      throw new NotFoundException(`Productos no encontrados`);
    }
    return products;
  }

  @HttpCode(200)
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Partial<Products>> {
    try {
      const foundProducts = await this.productsService.getProductById(id);
      return foundProducts;
    } catch (error) {
      console.log('error buscando el producto en el controlador', error);
    }
  }
  @HttpCode(201)
  @Post()
  @UseGuards(AuthGuard)
  async createProduct(@Body() product: Products[]): Promise<string[]> {
    try {
      const create = await this.productsService.createProduct(product);
      return create.map((product) => product.id);
    } catch (error) {
      console.log('error al crear el usuario en el controlador', error);
    }
  }
  @HttpCode(200) // ACA DEBO RECIBIR LA MODIFICACION
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateProduct(
    @Body() product: Products,
    @Param('id') id: string,
  ): Promise<string> {
    try {
      const foundProduct = await this.productsService.updateProduct(
        id,
        product,
      );
      return foundProduct.id;
    } catch (error) {
      console.log('error al actualizar el producto en el controlador', error);
    }
  }
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string): Promise<string> {
    try {
      const foundProduct = await this.productsService.deleteProduct(id);
      console.log('se elimino el producto', foundProduct);
      return foundProduct;
    } catch (error) {
      console.log('error al eliminar el producto en el controlador', error);
    }
  }
}
