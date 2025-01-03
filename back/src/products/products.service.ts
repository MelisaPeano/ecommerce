import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginatedResult } from '../interfaces/paginatedInterface';
import { Products } from '../entitys/products.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { createProductDto } from './dto/createProduct.dto';
import { v4 as uuid } from 'uuid';
import { CategoriesService } from 'src/categories/categories.service';
import { newCategoryDto } from 'src/categories/dto/newCategory.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    private readonly cloudinaryRepository: CloudinaryService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async getProducts(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<Products>> {
    const [data, totalItems] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit, // Paginación
      take: limit,
    });
    return {
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      data: data.map((product) => ({
        // Mapea los productos a la interfaz adecuada
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imgUrl: product.imgUrl,
        category: product.category,
      })),
    };
  }
  async getProductById(id: string): Promise<Products> {
    try {
      const product = await this.productsRepository.findOneBy({ id });
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imgUrl: product.imgUrl,
        category: product.category,
      };
    } catch (error) {
      console.log('error en el servicio de productos', error);
    }
  }
  async createProduct(products: createProductDto): Promise<Products> {

    if (products) {
      const existingProduct = await this.productsRepository.findOne({
        where: { name: products.name },
      });
      const categories = await this.categoriesService.addCategories(new newCategoryDto({
        name: products.category
      }));
      if (!existingProduct) {
        const newProduct = this.productsRepository.create({
          id: uuid(),
          name: products.name,
          description: products.description,
          price: products.price,
          stock: products.stock,
          category: categories.id,
        });
        await this.productsRepository.save(newProduct);
        return newProduct;
      }
      throw new Error('El producto ya existe');
    }

    
  }
  async updateProduct(
    id: string,
    productsfound: Partial<Products>,
  ): Promise<Products> {
    try {
      await this.productsRepository.update(id, productsfound);
      const updatedProduct = await this.productsRepository.findOneBy({ id });
      return {
        id: updatedProduct.id,
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        stock: updatedProduct.stock,
        imgUrl: updatedProduct.imgUrl,
        category: updatedProduct.category,
      };
    } catch (error) {
      console.log('error al actualizar el producto en el servicio', error);
    }
  }
  async deleteProduct(id: string): Promise<string> {
    try {
      const product = await this.getProductById(id);
      await this.productsRepository.delete({ id: product.id });
      return product.id;
    } catch (error) {
      console.log('error en eliminar el producto', error);
    }
  }
  async updateProductImage(
    id: string,
    file: Express.Multer.File,
  ): Promise<Products> {
    const product = await this.getProductById(id);
    if (!product) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const uploadCloudinary = await this.cloudinaryRepository.uploadImage(file, id);
    product.imgUrl = uploadCloudinary.secure_url;
    return await this.productsRepository.save(product);
  }
}
