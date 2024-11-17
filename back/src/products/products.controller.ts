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
import { RoleUser } from 'src/decorators/roles.decorator';
import { Roles } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Retorna todos los productos' })
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
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Retorna un producto' })
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
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Retorna el id del producto creado' })
  @ApiBody({ type: 'array de productos' })
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
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualiza un producto',
    description: 'Solo el admin puede actualizar un producto, requiere rol admin',
  })
  @ApiResponse({ status: 200, description: 'Retorna el id del producto modificado' })
  @ApiBody({ type: 'array de productos' })
  @ApiParam({ name: 'id', required: true })
  @HttpCode(200) // ACA DEBO RECIBIR LA MODIFICACION
  @RoleUser(Roles.ADMIN)
  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
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
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Retorna el id del producto eliminado' })
  @ApiParam({ name: 'id', required: true })
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
