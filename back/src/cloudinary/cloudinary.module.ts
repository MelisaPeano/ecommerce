import { forwardRef, Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import * as cloudinary from 'cloudinary';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  imports: [AuthModule, UsersModule, JwtModule, forwardRef(() => ProductsModule), CategoriesModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService,
    CategoriesService,
    {
      provide: 'CLOUDINARY',
      useValue: cloudinary, 
    },
    AuthService, UsersService, JwtService, ProductsService],
  exports: [CloudinaryService, 'CLOUDINARY'],
})
export class CloudinaryModule {}
