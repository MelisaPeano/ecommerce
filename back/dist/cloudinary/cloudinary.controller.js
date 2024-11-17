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
exports.CloudinaryController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("./cloudinary.service");
const fileValidation_pipe_1 = require("../pipes/fileValidation.pipe");
const auth_guard_1 = require("../auth/guards/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let CloudinaryController = class CloudinaryController {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    async uploadImage(id, image) {
        return this.cloudinaryService.uploadImage(image);
    }
};
exports.CloudinaryController = CloudinaryController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiParam)({ name: 'image' }),
    (0, common_1.Post)('/uploadImage/:id '),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(fileValidation_pipe_1.FileValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CloudinaryController.prototype, "uploadImage", null);
exports.CloudinaryController = CloudinaryController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService])
], CloudinaryController);
//# sourceMappingURL=cloudinary.controller.js.map