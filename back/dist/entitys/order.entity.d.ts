import { OrderDetail } from './orderDetails.entity';
export declare class Order {
    id: string;
    user_id: string;
    date: Date;
    orderDetail: OrderDetail;
}
