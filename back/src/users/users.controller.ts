import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginatedResult } from 'src/interfaces/paginatedInterface';
import { AuthGuard } from 'src/auth/auth.guard';
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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @HttpCode(200)
  @Get()
  @UseGuards(AuthGuard)
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<PaginatedResult<UserResponseDto>> {
    try {
      const users = await this.usersService.getUsers(page, limit);
      const usersWithoutPass = users.data.map((user) => {
        const userResponse = new UserResponseDto(user);
        return userResponse;
      });
      return {
        data: usersWithoutPass,
        totalItems: users.totalItems,
        totalPages: users.totalPages,
        currentPage: users.currentPage,
      };
    } catch (error) {
      console.log('error al obtener los usuarios en el controlador', error);
    }
  }
  @Get('auth0/protected')
  getAuth0Protected(@Req() req: Request) {
    return JSON.stringify(req.oidc.user);
  }
  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserResponseDto> {
    try {
      const foundUser = await this.usersService.getUsersById(id);
      const user = new UserResponseDto({
        name: foundUser.name,
        email: foundUser.email,
        address: foundUser.address,
        phone: foundUser.phone,
        country: foundUser.country,
        city: foundUser.city,
        orders: {
          id: foundUser.orders.map((order) => order.id),
          date: foundUser.orders.map((order) => order.date),
        },
      });
      return user;
    } catch (error) {
      console.log('error buscando el usuario en el controlador', error);
    }
  }
  @HttpCode(200) // ACA DEBO RECIBIR LA MODIFICACION
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Body('user') user: CreateUserDto,
    @Param('id') id: string,
  ): Promise<string> {
    try {
      const foundUser = await this.usersService.updateUser(id, user);
      return foundUser.id;
    } catch (error) {
      console.log('error al actualizar el usuario en el controlador', error);
    }
  }
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string): Promise<string> {
    try {
      const foundUser = await this.usersService.deleteUser(id);
      console.log('se elimino el usuario', foundUser);
      return foundUser;
    } catch (error) {
      console.log('error al eliminar el usuario en el controlador', error);
    }
  }
}
