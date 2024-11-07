import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { Order } from 'src/entitys/order.entity';
import { OrderDetail } from 'src/entitys/orderDetails.entity';
import { OrderDetailResponse } from 'src/orderDetail/dto/orderDetailResponse';
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
