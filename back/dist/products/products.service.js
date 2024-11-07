"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_entity_1 = require("../entitys/products.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let ProductsService = class ProductsService {
    constructor(productsRepository, cloudinaryRepository) {
        this.productsRepository = productsRepository;
        this.cloudinaryRepository = cloudinaryRepository;
    }
    async getProducts(page, limit) {
        const [data, totalItems] = await this.productsRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            data: data.map((product) => ({
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
    async getProductById(id) {
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
        }
        catch (error) {
            console.log('error en el servicio de productos', error);
        }
    }
    async createProduct(products) {
        const addedProducts = [];
        for (const product of products) {
            const existingProduct = await this.productsRepository.findOne({
                where: { name: product.name },
            });
            if (!existingProduct) {
                const newProduct = this.productsRepository.create(product);
                addedProducts.push(await this.productsRepository.save(newProduct));
            }
        }
        return addedProducts;
    }
    async updateProduct(id, productsfound) {
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
        }
        catch (error) {
            console.log('error al actualizar el producto en el servicio', error);
        }
    }
    async deleteProduct(id) {
        try {
            const product = await this.getProductById(id);
            await this.productsRepository.delete({ id: product.id });
            return product.id;
        }
        catch (error) {
            console.log('error en eliminar el producto', error);
        }
    }
    async updateProductImage(id, file) {
        const product = await this.getProductById(id);
        if (!product) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        const uploadCloudinary = await this.cloudinaryRepository.uploadImage(file);
        product.imgUrl = uploadCloudinary.secure_url;
        return await this.productsRepository.save(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(products_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        cloudinary_service_1.CloudinaryService])
], ProductsService);
//# sourceMappingURL=products.service.js.map