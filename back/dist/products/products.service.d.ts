import { PaginatedResult } from '../interfaces/paginatedInterface';
import { Products } from '../entitys/products.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly cloudinaryRepository;
    constructor(productsRepository: Repository<Products>, cloudinaryRepository: CloudinaryService);
    getProducts(page: number, limit: number): Promise<PaginatedResult<Products>>;
    getProductById(id: string): Promise<Products>;
    createProduct(products: Omit<Products, 'id'>[]): Promise<Products[]>;
    updateProduct(id: string, productsfound: Partial<Products>): Promise<Products>;
    deleteProduct(id: string): Promise<string>;
    updateProductImage(id: string, file: Express.Multer.File): Promise<Products>;
}
