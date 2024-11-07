import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    getUsers(): string;
    loginUser(user: LoginUserDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
        token: string;
    }>;
    signupUser(user: CreateUserDto, repetPassword: string): Promise<{
        id: string;
        name: string;
        phone: number;
        email: string;
    }>;
}
