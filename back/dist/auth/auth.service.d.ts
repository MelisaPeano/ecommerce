import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(): string;
    validateToken(user: LoginUserDto): Promise<boolean>;
}
