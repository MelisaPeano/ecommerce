import { Category } from 'src/entitys/categories.entity';
import { Repository } from 'typeorm';
export declare class CategoriesSeed {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    seed(): Promise<void>;
}
