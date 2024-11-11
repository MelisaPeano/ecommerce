import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @Get()
  getUsers() {
    return this.authService.getUsers();
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async loginUser(@Body() user: LoginUserDto) {
    const login = await this.usersService.loginUser(user);
    return login;
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signupUser(
    @Body() user: CreateUserDto,
  ) {
      await this.usersService.createUser(user);
      const signup = {
        id: user.name,
        name: user.name,
        phone: user.phone,
        email: user.email,
      };
      return signup;
  }
}
