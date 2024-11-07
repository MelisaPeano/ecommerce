import { ProductsService } from './products.service';
import { PaginatedResult } from 'src/interfaces/paginatedInterface';
import { Products } from 'src/entitys/products.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page?: number, limit?: number): Promise<PaginatedResult<Products>>;
    getProductById(id: string): Promise<Partial<Products>>;
    createProduct(product: Products[]): Promise<string[]>;
    updateProduct(product: Products, id: string): Promise<string>;
    deleteProduct(id: string): Promise<string>;
}
