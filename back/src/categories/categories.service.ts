import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from 'src/entitys/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}
  async getCategories(): Promise<Category[]> {
    return this.categoriesRepository.getCategories();
  }

  async addCategories(categories: Category[]): Promise<Category[]> {
    if (!Array.isArray(categories)) {
      throw new Error('Expected categories to be an array');
    }
    return await this.categoriesRepository.addCategories(categories);
  }
}
