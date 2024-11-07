"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const products_module_1 = require("./products/products.module");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = __importDefault(require("./config/typeorm"));
const categories_module_1 = require("./categories/categories.module");
const seeder_module_1 = require("./seeder/seeder.module");
const products_service_1 = require("./products/products.service");
const categories_service_1 = require("./categories/categories.service");
const orders_module_1 = require("./orders/orders.module");
const orders_service_1 = require("./orders/orders.service");
const cloudinary_service_1 = require("./cloudinary/cloudinary.service");
const cloudinary_1 = require("./config/cloudinary");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_2.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (ConfigService) => ({
                    ...ConfigService.get('typeorm'),
                    autoLoadEntities: true,
                }),
            }),
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
            categories_module_1.CategoriesModule,
            seeder_module_1.SeederModule,
            orders_module_1.OrdersModule,
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            products_service_1.ProductsService,
            categories_service_1.CategoriesService,
            orders_service_1.OrdersService,
            cloudinary_1.CloudinaryConfig,
            cloudinary_service_1.CloudinaryService,
            jwt_1.JwtService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map