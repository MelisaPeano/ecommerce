import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginUser(user: LoginUserDto): Promise<{
        user: {
            id: string;
            email: string;
            role: import("../enums/role.enum").Roles[];
        };
        token: string;
    }>;
    signupUser(user: CreateUserDto): Promise<{
        id: string;
        name: string;
        phone: number;
        email: string;
    }>;
}
