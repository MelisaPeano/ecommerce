import { Order } from "src/entitys/order.entity";
export declare class UserResponseDto {
    name: string;
    email: string;
    address: string;
    phone: number;
    country?: string | undefined;
    city?: string | undefined;
    orders?: Order[];
    constructor(user: Partial<UserResponseDto>);
}
