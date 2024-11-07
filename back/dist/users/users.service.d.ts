import { PaginatedResult } from 'src/interfaces/paginatedInterface';
import { Users } from 'src/entitys/users.entity';
import { Repository } from 'typeorm';
import { Order } from 'src/entitys/order.entity';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from './dto/responseUser.dto';
export declare class UsersService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<Users>, jwtService: JwtService);
    getUsers(page: number, limit: number): Promise<PaginatedResult<UserResponseDto>>;
    getUsersById(id: string): Promise<Omit<Users, 'password'> & {
        orders: Order[];
    }>;
    createUser(user: CreateUserDto): Promise<UserResponseDto>;
    updateUser(id: string, userfound: UpdateUserDto): Promise<Users>;
    deleteUser(id: string): Promise<string>;
    loginUser(user: LoginUserDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        token: string;
    }>;
}
