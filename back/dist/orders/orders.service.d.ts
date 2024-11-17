import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { Repository } from 'typeorm';
import { Order } from '../entitys/order.entity';
import { OrderDetail } from '../entitys/orderDetails.entity';
import { OrderDetailResponse } from '../orderDetail/dto/orderDetailResponse';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly usersService;
    private readonly productsService;
    private readonly orderDetailsRepository;
    constructor(orderRepository: Repository<Order>, usersService: UsersService, productsService: ProductsService, orderDetailsRepository: Repository<OrderDetail>);
    addOrder(userId: string, productsId: {
        productId: string;
    }[]): Promise<OrderDetailResponse>;
    getOrders(id: string): Promise<Order>;
}
