import { CategoriesRepository } from './categories.repository';
import { Category } from 'src/entitys/categories.entity';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    getCategories(): Promise<Category[]>;
    addCategories(categories: Category[]): Promise<Category[]>;
}
