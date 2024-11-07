import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entitys/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
  async addCategories(categories: Partial<Category>[]): Promise<Category[]> {
    const addedCategories: Category[] = [];
    for (const category of categories) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: category.name },
      });
      if (!existingCategory) {
        const newCategory = this.categoryRepository.create(category);
        addedCategories.push(await this.categoryRepository.save(newCategory));
      }
    }

    return addedCategories;
  }
}
