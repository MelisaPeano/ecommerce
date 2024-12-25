import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entitys/products.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), AuthModule, CloudinaryModule, CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService, CloudinaryService, CategoriesService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
