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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
const loginUser_dto_1 = require("../users/dto/loginUser.dto");
const createUser_dto_1 = require("../users/dto/createUser.dto");
const auth_guard_1 = require("./auth.guard");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    getUsers() {
        return this.authService.getUsers();
    }
    async loginUser(user) {
        if (!user.email && user.password) {
            throw new common_1.BadRequestException('faltan datos');
        }
        const login = await this.usersService.loginUser(user);
        return login;
    }
    async signupUser(user, repetPassword) {
        if (!user.password && !repetPassword) {
            throw new common_1.BadRequestException('Falta completar campos requeridos');
        }
        if (user.password === repetPassword) {
            await this.usersService.createUser(user);
            const signup = {
                id: user.name,
                name: user.name,
                phone: user.phone,
                email: user.email,
            };
            return signup;
        }
        else {
            throw new common_1.BadRequestException('campos incorrectos');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUsers", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)('User')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginUser_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)('User')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map