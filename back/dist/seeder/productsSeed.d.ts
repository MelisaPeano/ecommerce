import { Category } from 'src/entitys/categories.entity';
import { Products } from 'src/entitys/products.entity';
import { Repository } from 'typeorm';
export declare class ProductsSeed {
    private readonly productsService;
    private readonly categoriesService;
    constructor(productsService: Repository<Category>, categoriesService: Repository<Products>);
    findCategoryByName(category: string): Promise<Products>;
    seed(): Promise<void>;
}
