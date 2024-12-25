import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entitys/categories.entity';
import { Repository } from 'typeorm';
import { newCategoryDto } from './dto/newCategory.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categories: Repository<Category> ) {}
  async getCategories(): Promise<Category[]> {
    return this.categories.find();
  }

  async addCategories(categories: newCategoryDto): Promise<Category> {
    if (categories) {
      const existingCategory = await this.categories.findOne({
        where: { name: categories.name },
      });
      if (!existingCategory) {
        const newCategory = this.categories.create({
          id: uuid(),
          name: categories.name
        });
        await this.categories.save(newCategory);
        return newCategory;
      }
      return existingCategory;
    }
;
  }
}