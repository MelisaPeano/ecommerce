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
  @UseGuards(AuthGuard)
  @Post('signin')
  async loginUser(@Body('User') user: LoginUserDto) {
    // Modificar la funcionalidad de signIn para que
    // valide el password encriptado con el provisto en la solicitud.
    if (!user.email && user.password) {
      throw new BadRequestException('faltan datos');
    }
    const login = await this.usersService.loginUser(user);
    return login;
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signupUser(
    @Body('User') user: CreateUserDto,
    @Body('password') repetPassword: string,
  ) {
    if (!user.password && !repetPassword) {
      throw new BadRequestException('Falta completar campos requeridos');
    }
    if (user.password === repetPassword) {
      await this.usersService.createUser(user);
      const signup = {
        id: user.name,
        name: user.name,
        phone: user.phone,
        email: user.email,
      };
      return signup;
    } else {
      throw new BadRequestException('campos incorrectos');
    }
  }
}
