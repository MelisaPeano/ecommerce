import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entitys/categories.entity';
import { Products } from 'src/entitys/products.entity';
import { CategoriesSeed } from './categoriesSeed';
import { ProductsSeed } from './productsSeed';
import { UserSeed } from './userSeeder';
import { Users } from 'src/entitys/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Products, Users])],
  providers: [CategoriesSeed, ProductsSeed, UserSeed],
  exports: [CategoriesSeed, ProductsSeed, UserSeed],
})
export class SeederModule {}
