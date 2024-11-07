import { UsersService } from './users.service';
import { PaginatedResult } from 'src/interfaces/paginatedInterface';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserResponseDto } from './dto/responseUser.dto';
import { Request } from 'express';
export interface UserInterface {
    email: string;
    name?: string;
    password?: string;
    address?: string;
    phone?: string;
    country?: string | undefined;
    city?: string | undefined;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(page?: number, limit?: number): Promise<PaginatedResult<UserResponseDto>>;
    getAuth0Protected(req: Request): string;
    getUserById(id: string): Promise<UserResponseDto>;
    updateUser(user: CreateUserDto, id: string): Promise<string>;
    deleteUser(id: string): Promise<string>;
}