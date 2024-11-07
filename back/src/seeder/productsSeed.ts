import { InjectRepository } from '@nestjs/typeorm';
import productsData from './data/products.json';
import { Category } from 'src/entitys/categories.entity';
import { Products } from 'src/entitys/products.entity';
import { Repository } from 'typeorm';

export class ProductsSeed {
  constructor(
    @InjectRepository(Category)
    private readonly productsService: Repository<Category>,
    @InjectRepository(Products)
    private readonly categoriesService: Repository<Products>,
  ) {}
  async findCategoryByName(category: string) {
    const foundCategory = await this.categoriesService.findOne({
      where: { name: category },
    });
    if (!foundCategory) {
      throw new Error(`Category ${category} not found`);
    }
    return foundCategory;
  }
  async seed() {
    const existingProductsNames = (await this.productsService.find()).map(
      (product) => product.name,
    );
    for (const products of productsData) {
      if (!existingProductsNames.includes(products.name)) {
        const product = new Products();
        product.name = products.name;
        product.description = products.description;
        product.price = products.price;
        product.stock = products.stock;
        product.category = (
          await this.findCategoryByName(products.category)
        ).name;
        await this.productsService.save(product);
      }
    }
  }
}
