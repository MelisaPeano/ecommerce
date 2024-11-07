import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entitys/categories.entity';
import { Products } from 'src/entitys/products.entity';
import { CategoriesSeed } from './categoriesSeed';
import { ProductsSeed } from './productsSeed';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Products])],
  providers: [CategoriesSeed, ProductsSeed],
  exports: [CategoriesSeed, ProductsSeed],
})
export class SeederModule {}
