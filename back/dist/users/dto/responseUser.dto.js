"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDto = void 0;
class UserResponseDto {
    constructor(user) {
        const { name, email, address, phone, country, city } = user;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.country = country;
        this.city = city;
    }
}
exports.UserResponseDto = UserResponseDto;
//# sourceMappingURL=responseUser.dto.js.map