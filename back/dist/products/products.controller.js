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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
const products_entity_1 = require("../entitys/products.entity");
const roles_decorator_1 = require("../decorators/roles.decorator");
const role_enum_1 = require("../enums/role.enum");
const roles_guard_1 = require("../auth/guards/roles.guard");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async getProducts(page = 1, limit = 5) {
        const products = await this.productsService.getProducts(page, limit);
        if (!products) {
            throw new common_1.NotFoundException(`Productos no encontrados`);
        }
        return products;
    }
    async getProductById(id) {
        try {
            const foundProducts = await this.productsService.getProductById(id);
            return foundProducts;
        }
        catch (error) {
            console.log('error buscando el producto en el controlador', error);
        }
    }
    async createProduct(product) {
        try {
            const create = await this.productsService.createProduct(product);
            return create.map((product) => product.id);
        }
        catch (error) {
            console.log('error al crear el usuario en el controlador', error);
        }
    }
    async updateProduct(product, id) {
        try {
            const foundProduct = await this.productsService.updateProduct(id, product);
            return foundProduct.id;
        }
        catch (error) {
            console.log('error al actualizar el producto en el controlador', error);
        }
    }
    async deleteProduct(id) {
        try {
            const foundProduct = await this.productsService.deleteProduct(id);
            console.log('se elimino el producto', foundProduct);
            return foundProduct;
        }
        catch (error) {
            console.log('error al eliminar el producto en el controlador', error);
        }
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)('/seeder'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, roles_decorator_1.RoleUser)(role_enum_1.Roles.ADMIN),
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [products_entity_1.Products, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map