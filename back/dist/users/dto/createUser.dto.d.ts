import { Roles } from 'src/enums/role.enum';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    address?: string;
    phone?: number;
    country?: string;
    city?: string;
    role?: Roles;
    repetPassword: string;
}
