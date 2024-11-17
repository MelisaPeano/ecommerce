import { Category } from 'src/entitys/categories.entity';
import { Repository } from 'typeorm';
export declare class CategoriesService {
    private readonly categories;
    constructor(categories: Repository<Category>);
    getCategories(): Promise<Category[]>;
    addCategories(categories: Partial<Category>[]): Promise<Category[]>;
}
