import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { Users } from 'src/entitys/users.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiParam({ name: 'user', type: LoginUserDto })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async loginUser(@Body() user: LoginUserDto) {
    const login = await this.authService.loginUser(user);
    return login;
  }
  @ApiResponse({ status: 201, description: 'Registro exitoso' })
  @ApiResponse({ status: 400, description: 'BadRequest' })
  @ApiParam({ name: 'user', type: CreateUserDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signupUser(
    @Body() user: CreateUserDto,
  ): Promise<Partial<Users>> {
      const newUser = await this.authService.createUser(user);
       return {
        id: newUser.id,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
      };
  }
}
