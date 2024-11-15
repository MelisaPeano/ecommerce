import { Order } from './order.entity';
import { Roles } from 'src/enums/role.enum';
export declare class Users {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    address: string;
    city: string;
    orders: Order[];
    role: Roles;
}
