import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrders(id: string): Promise<import("../entitys/order.entity").Order>;
    reciveOrder(userId: string, products: [{
        productId: string;
    }]): Promise<import("../orderDetail/dto/orderDetailResponse").OrderDetailResponse>;
}
