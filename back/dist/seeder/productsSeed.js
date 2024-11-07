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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsSeed = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const products_json_1 = __importDefault(require("./data/products.json"));
const categories_entity_1 = require("../entitys/categories.entity");
const products_entity_1 = require("../entitys/products.entity");
const typeorm_2 = require("typeorm");
let ProductsSeed = class ProductsSeed {
    constructor(productsService, categoriesService) {
        this.productsService = productsService;
        this.categoriesService = categoriesService;
    }
    async findCategoryByName(category) {
        const foundCategory = await this.categoriesService.findOne({
            where: { name: category },
        });
        if (!foundCategory) {
            throw new Error(`Category ${category} not found`);
        }
        return foundCategory;
    }
    async seed() {
        const existingProductsNames = (await this.productsService.find()).map((product) => product.name);
        for (const products of products_json_1.default) {
            if (!existingProductsNames.includes(products.name)) {
                const product = new products_entity_1.Products();
                product.name = products.name;
                product.description = products.description;
                product.price = products.price;
                product.stock = products.stock;
                product.category = (await this.findCategoryByName(products.category)).name;
                await this.productsService.save(product);
            }
        }
    }
};
exports.ProductsSeed = ProductsSeed;
exports.ProductsSeed = ProductsSeed = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsSeed);
//# sourceMappingURL=productsSeed.js.map