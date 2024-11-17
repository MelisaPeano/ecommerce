import { PaginatedResult } from 'src/interfaces/paginatedInterface';
import { Users } from '../entitys/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtService } from '@nestjs/jwt';
import { userResponseDto } from './dto/userResponse.dto';
import { Roles } from '../enums/role.enum';
export declare class UsersService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<Users>, jwtService: JwtService);
    getUsers(page: number, limit: number): Promise<PaginatedResult<userResponseDto>>;
    getUsersById(id: string): Promise<userResponseDto>;
    createUser(user: CreateUserDto): Promise<userResponseDto>;
    updateUser(id: string, userfound: UpdateUserDto): Promise<Users>;
    deleteUser(id: string): Promise<string>;
    loginUser(user: LoginUserDto): Promise<{
        user: {
            id: string;
            email: string;
            role: Roles[];
        };
        token: string;
    }>;
}
