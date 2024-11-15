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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const order_entity_1 = require("./order.entity");
const role_enum_1 = require("../enums/role.enum");
let Users = class Users {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 60, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], Users.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.user),
    __metadata("design:type", Array)
], Users.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: role_enum_1.Roles.USER }),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users',
    })
], Users);
//# sourceMappingURL=users.entity.js.map