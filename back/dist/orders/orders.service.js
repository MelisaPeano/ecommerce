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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const products_service_1 = require("../products/products.service");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../entitys/order.entity");
const typeorm_2 = require("@nestjs/typeorm");
const orderDetails_entity_1 = require("../entitys/orderDetails.entity");
const uuid_1 = require("uuid");
let OrdersService = class OrdersService {
    constructor(orderRepository, usersService, productsService, orderDetailsRepository) {
        this.orderRepository = orderRepository;
        this.usersService = usersService;
        this.productsService = productsService;
        this.orderDetailsRepository = orderDetailsRepository;
    }
    async addOrder(userId, productsId) {
        if (!productsId) {
            throw new Error('No se han agregado productos');
        }
        if (!userId) {
            throw new Error('No se ha agregado un usuario');
        }
        const user = await this.usersService.getUsersById(userId);
        const totalPrice = [];
        const products = await Promise.all(productsId.map(async (product) => {
            const foundProducts = await this.productsService.getProductById(product.productId);
            if (!foundProducts || foundProducts.stock <= 0) {
                throw new Error(`${foundProducts.id} no existe, o no tiene stock`);
            }
            else {
                totalPrice.push(foundProducts.price);
                foundProducts.stock -= 1;
                await this.productsService.updateProduct(foundProducts.id, foundProducts);
                return foundProducts;
            }
        }));
        const orderDetail = this.orderDetailsRepository.create({
            id: (0, uuid_1.v4)(),
            price: totalPrice.reduce((a, b) => a + b, 0),
            products: products,
        });
        await this.orderDetailsRepository.save(orderDetail);
        const order = this.orderRepository.create({
            id: (0, uuid_1.v4)(),
            user_id: user.id,
            date: new Date(),
            orderDetail,
        });
        await this.orderRepository.save(order);
        const ordenSave = {
            order: order,
            price: orderDetail.price,
            orderDetail: order.orderDetail.id,
        };
        return ordenSave;
    }
    async getOrders(id) {
        const orders = await this.orderRepository.findOneBy({
            id: id,
        });
        const orderDetail = await this.orderDetailsRepository.find({
            where: { id: orders.id },
            relations: ['orderDetail', 'products'],
        });
        return {
            id: orders.id,
            user_id: orders.user_id,
            date: orders.date,
            orderDetail: {
                id: orderDetail[0].id,
                price: orders.orderDetail.price,
                order: orders.orderDetail.order,
                products: orders.orderDetail.products,
            },
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(order_entity_1.Order)),
    __param(3, (0, typeorm_2.InjectRepository)(orderDetails_entity_1.OrderDetail)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService,
        products_service_1.ProductsService,
        typeorm_1.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map