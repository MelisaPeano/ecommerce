import { Category } from 'src/entitys/categories.entity';
import { Repository } from 'typeorm';
export declare class CategoriesRepository {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    getCategories(): Promise<Category[]>;
    addCategories(categories: Partial<Category>[]): Promise<Category[]>;
}
