"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../entitys/order.entity");
const orderDetails_entity_1 = require("../entitys/orderDetails.entity");
const users_module_1 = require("../users/users.module");
const products_module_1 = require("../products/products.module");
const users_service_1 = require("../users/users.service");
const products_service_1 = require("../products/products.service");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("../auth/auth.module");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, orderDetails_entity_1.OrderDetail]),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            cloudinary_module_1.CloudinaryModule,
            auth_module_1.AuthModule,
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService, users_service_1.UsersService, products_service_1.ProductsService, jwt_1.JwtService],
        exports: [orders_service_1.OrdersService, typeorm_1.TypeOrmModule],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map