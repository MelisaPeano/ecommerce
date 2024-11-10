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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
const createUser_dto_1 = require("./dto/createUser.dto");
const responseUser_dto_1 = require("./dto/responseUser.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUsers(page = 1, limit = 5) {
        try {
            const users = await this.usersService.getUsers(page, limit);
            const usersWithoutPass = users.data.map((user) => {
                const userResponse = new responseUser_dto_1.UserResponseDto(user);
                return userResponse;
            });
            return {
                data: usersWithoutPass,
                totalItems: users.totalItems,
                totalPages: users.totalPages,
                currentPage: users.currentPage,
            };
        }
        catch (error) {
            console.log('error al obtener los usuarios en el controlador', error);
        }
    }
    getAuth0Protected(req) {
        return JSON.stringify(req.oidc.user);
    }
    async getUserById(id) {
        try {
            const foundUser = await this.usersService.getUsersById(id);
            const user = new responseUser_dto_1.UserResponseDto({
                name: foundUser.name,
                email: foundUser.email,
                address: foundUser.address,
                phone: foundUser.phone,
                country: foundUser.country,
                city: foundUser.city,
                orders: {
                    id: foundUser.orders.map((order) => order.id),
                    date: foundUser.orders.map((order) => order.date),
                },
            });
            return user;
        }
        catch (error) {
            console.log('error buscando el usuario en el controlador', error);
        }
    }
    async updateUser(user, id) {
        try {
            const foundUser = await this.usersService.updateUser(id, user);
            return foundUser.id;
        }
        catch (error) {
            console.log('error al actualizar el usuario en el controlador', error);
        }
    }
    async deleteUser(id) {
        try {
            const foundUser = await this.usersService.deleteUser(id);
            console.log('se elimino el usuario', foundUser);
            return foundUser;
        }
        catch (error) {
            console.log('error al eliminar el usuario en el controlador', error);
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('auth0/protected'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAuth0Protected", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)('user')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map