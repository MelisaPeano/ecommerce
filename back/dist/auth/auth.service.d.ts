import { LoginUserDto } from '../users/dto/loginUser.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(user: CreateUserDto): Promise<import("../users/dto/userResponse.dto").userResponseDto>;
    loginUser(user: LoginUserDto): Promise<{
        user: {
            id: string;
            email: string;
            role: import("../enums/role.enum").Roles[];
        };
        token: string;
    }>;
}
