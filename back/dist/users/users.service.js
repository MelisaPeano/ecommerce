"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("../entitys/users.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const uuid_1 = require("uuid");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const userResponse_dto_1 = require("./dto/userResponse.dto");
const role_enum_1 = require("../enums/role.enum");
let UsersService = class UsersService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async getUsers(page, limit) {
        try {
            const [data, totalItems] = await this.usersRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            });
            return {
                data: data.map((user) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                    country: user.country,
                    city: user.city,
                    orders: user.orders,
                })),
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
            };
        }
        catch (error) {
            console.log('error en el servicio de usuarios', error);
        }
    }
    async getUsersById(id) {
        console.log(`Buscando usuario con ID: ${id}`);
        try {
            const users = await this.usersRepository.findOne({
                where: { id },
                relations: ['orders'],
            });
            if (!users) {
                throw new Error('Usuario no encontrado');
            }
            const ordersUser = users.orders.map((order) => ({
                id: order.id,
                date: order.date,
                orderDetail: order.orderDetail,
                user_id: order.user_id,
                user: order.user,
            }));
            return {
                name: users.name,
                email: users.email,
                address: users.address,
                phone: Number(users.phone),
                country: users.country,
                city: users.city,
                orders: ordersUser,
            };
        }
        catch (error) {
            console.log('error en el servicio de usuarios', error);
            throw new Error('Error al obtener el usuario');
        }
    }
    async createUser(user) {
        try {
            const userFound = await this.usersRepository.findOneBy({
                email: user.email,
            });
            if (userFound) {
                throw new Error(`El usuario ${user.email} ya existe`);
            }
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(user.password, salt);
            const userCreated = {
                id: (0, uuid_1.v4)(),
                ...user,
                password: hash
            };
            const roleUser = user.role || role_enum_1.Roles.USER;
            const createSuccess = this.usersRepository.create(userCreated);
            const savedUser = await this.usersRepository.save(createSuccess);
            return new userResponse_dto_1.userResponseDto(savedUser);
        }
        catch (error) {
            throw new Error(`Error al crear el usuario, vuelve a intentarlo ${error.message}`);
        }
    }
    async updateUser(id, userfound) {
        try {
            if (!userfound || Object.keys(userfound).length === 0) {
                throw new Error('No se proporcionaron valores para actualizar');
            }
            await this.usersRepository.update(id, userfound);
            const updatedUser = await this.usersRepository.findOneBy({ id });
            return updatedUser;
        }
        catch (error) {
            console.log('error al actualizar el usuario en el servicio', error);
            throw new Error('Error al actualizar el usuario');
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.usersRepository.delete({ id });
            return user.affected && user.affected > 0 ? id : null;
        }
        catch (error) {
            console.log('error en eliminar el usuario', error);
        }
    }
    async loginUser(user) {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET no está definido en las variables de entorno');
        }
        try {
            const userFound = await this.usersRepository.findOneBy({
                email: user.email,
            });
            if (!userFound) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const isPasswordValid = await bcrypt.compare(user.password, userFound.password);
            console.log('¿Es válida la contraseña?', isPasswordValid);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Credenciales incorrectas');
            }
            const secret = process.env.JWT_SECRET || 'default_secret_key';
            const payload = { userId: userFound.id, email: userFound.email, role: userFound.role };
            const token = this.jwtService.sign(payload, { secret, expiresIn: '1h' });
            return {
                user: {
                    id: userFound.id,
                    email: userFound.email,
                    role: [userFound.role],
                },
                token,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(`error al iniciar sesión, intente nuevamente ${error}`);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map