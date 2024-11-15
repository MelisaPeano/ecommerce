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
exports.CategoriesSeed = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entity_1 = require("../entitys/categories.entity");
const typeorm_2 = require("typeorm");
const categories_mock_1 = require("./categories.mock");
let CategoriesSeed = class CategoriesSeed {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async seed() {
        const existingCategories = await this.categoryRepository.find({
            where: { name: (0, typeorm_2.In)(categories_mock_1.categories) },
        });
        for (const categoryName of categories_mock_1.categories) {
            if (!existingCategories.some((category) => category.name === categoryName)) {
                const category = new categories_entity_1.Category();
                category.name = categoryName;
                await this.categoryRepository.save(category);
            }
        }
    }
};
exports.CategoriesSeed = CategoriesSeed;
exports.CategoriesSeed = CategoriesSeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesSeed);
//# sourceMappingURL=categoriesSeed.js.map