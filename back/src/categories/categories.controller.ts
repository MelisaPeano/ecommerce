import { Controller, Get, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  private readonly categories: CategoriesService;
  @Get('/seeder')
  @HttpCode(200)
  async seedCategories() {
    return await this.categories.getCategories();
  }
}
