import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entitys/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categories: Repository<Category> ) {}
  async getCategories(): Promise<Category[]> {
    return this.categories.find();
  }

  async addCategories(categories: Partial<Category>[]): Promise<Category[]> {
    const addedCategories: Category[] = [];
    for (const category of categories) {
      const existingCategory = await this.categories.findOne({
        where: { name: category.name },
      });
      if (!existingCategory) {
        const newCategory = this.categories.create(category);
        addedCategories.push(await this.categories.save(newCategory));
      }
    }

    return addedCategories;
  }
}