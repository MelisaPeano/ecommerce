"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryModule = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_controller_1 = require("./cloudinary.controller");
const cloudinary_service_1 = require("./cloudinary.service");
const auth_module_1 = require("../auth/auth.module");
const auth_service_1 = require("../auth/auth.service");
const users_service_1 = require("../users/users.service");
const users_module_1 = require("../users/users.module");
const jwt_1 = require("@nestjs/jwt");
let CloudinaryModule = class CloudinaryModule {
};
exports.CloudinaryModule = CloudinaryModule;
exports.CloudinaryModule = CloudinaryModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, users_module_1.UsersModule, jwt_1.JwtModule],
        controllers: [cloudinary_controller_1.CloudinaryController],
        providers: [cloudinary_service_1.CloudinaryService, auth_service_1.AuthService, users_service_1.UsersService, jwt_1.JwtService],
        exports: [cloudinary_service_1.CloudinaryService],
    })
], CloudinaryModule);
//# sourceMappingURL=cloudinary.module.js.map