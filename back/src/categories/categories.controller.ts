import { Controller, Get, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('categories')
export class CategoriesController {
  private readonly categories: CategoriesService;
  @ApiOperation({ summary: 'Endpoint sin parámetros' })
  @ApiResponse({ status: 200, description: 'Este endpoint devuelve todas las categorías' })
  @Get('/all')
  @HttpCode(200)
  async seedCategories() {
    return await this.categories.getCategories();
  }
}
