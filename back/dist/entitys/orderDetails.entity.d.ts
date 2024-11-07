import { Order } from './order.entity';
import { Products } from './products.entity';
export declare class OrderDetail {
    id: string;
    price: number;
    order: Order;
    products: Products[];
}
