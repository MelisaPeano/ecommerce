import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginatedResult } from 'src/interfaces/paginatedInterface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { userResponseDto } from './dto/userResponse.dto';
import { Request } from 'express';
import { RoleUser } from 'src/decorators/roles.decorator';
import { Roles } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Order } from 'src/entitys/order.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los usuarios, solo admin' })
  @ApiResponse({ status: 200, description: 'Obtener todos los usuarios' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @HttpCode(200)
  @Get()
  @RoleUser(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<PaginatedResult<userResponseDto>> {
    try {
      const users = await this.usersService.getUsers(page, limit);
      const usersWithoutPass = users.data.map((user) => {
        const userResponse = new userResponseDto(user);
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
  @ApiOperation({ summary: 'Protegido por auth0, para loguearse con auth0' })
  @Get('auth0/protected')
  getAuth0Protected(@Req() req: Request) {
    return JSON.stringify(req.oidc.user);
  }
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Obtener un usuario' })
  @ApiParam({ name: 'id', type: String })
  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard) // YA VERIFIQUÉ QUE ESTÁ BIEN
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<userResponseDto> {
    try {
      const foundUser = await this.usersService.getUsersById(id);
      const orderUser = foundUser.orders.map((order) => ({
        id: order.id,
        date: order.date,
      }))
      const user = new userResponseDto({
        name: foundUser.name,
        email: foundUser.email,
        address: foundUser.address,
        phone: foundUser.phone,
        country: foundUser.country,
        city: foundUser.city,
        orders: orderUser as Order[],
      });
      return user;
    } catch (error) {
      console.log('error buscando el usuario en el controlador', error);
      throw new NotFoundException('Usuario no encontrado');
    }
  }
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Actualizar un usuario' })
  @ApiParam({ name: 'id', type: String })
  @HttpCode(200) // FUNCIONA BIEN!
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Body() user: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<string> {
    try {
      const foundUser = await this.usersService.updateUser(id, user);
      return foundUser.id;
    } catch (error) {
      console.log('error al actualizar el usuario en el controlador', error);
      throw new NotFoundException('error al actualizar el usuario');
    }
  }
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Eliminar un usuario' })
  @ApiParam({ name: 'id', type: String })
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard) // YA VERIFIQUE QUE ESTÁ BIEN
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
