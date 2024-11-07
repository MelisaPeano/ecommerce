import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PaginatedResult } from 'src/interfaces/paginatedInterface';
import { Users } from 'src/entitys/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entitys/order.entity';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { v4 as uuid } from 'uuid';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from './dto/responseUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}
  async getUsers(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<UserResponseDto>> {
    try {
      const [data, totalItems] = await this.usersRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      return {
        data: data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          country: user.country,
          city: user.city,
          orders: user.orders,
        })),
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      };
    } catch (error) {
      console.log('error en el servicio de usuarios', error);
    }
  }
  async getUsersById(id: string): Promise<
    Omit<Users, 'password'> & {
      orders: Order[];
    }
  > {
    try {
      const users = await this.usersRepository.findOne({
        where: { id },
        relations: ['orders'],
      });
      if (!users) {
        throw new Error('Usuario no encontrado');
      }
      const ordersUser = users.orders.map((order) => ({
        id: order.id,
        date: order.date,
        orderDetail: order.orderDetail,
        user_id: order.user_id,
      }));
      return {
        id: id,
        name: users.name,
        email: users.email,
        address: users.address,
        phone: Number(users.phone),
        country: users.country,
        city: users.city,
        orders: ordersUser,
      };
    } catch (error) {
      console.log('error en el servicio de usuarios', error);
    }
  }
  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
    try {
      const userFound = await this.usersRepository.findOneBy({
        email: user.email,
      });
      if (userFound) {
        throw new Error(`El usuario ${user.email} ya existe`);
      }
      const salt = await bcrypt.genSalt();

      const hash = await bcrypt.hash(userFound.password, salt);
      const createSuccess = this.usersRepository.create({
        id: uuid(),
        password: hash,
        ...userFound,
      });
      return new UserResponseDto(createSuccess);
    } catch (error) {
      throw new Error(
        `Error al crear el usuario, vuelve a intentarlo ${error}`,
      );
    }
  }
  async updateUser(id: string, userfound: UpdateUserDto): Promise<Users> {
    try {
      await this.usersRepository.update(id, userfound);
      const updatedUser = await this.usersRepository.findOneBy({ id });
      return updatedUser;
    } catch (error) {
      console.log('error al actualizar el usuario en el servicio', error);
    }
  }
  async deleteUser(id: string): Promise<string> {
    try {
      const user = await this.usersRepository.delete({ id });
      return user.affected && user.affected > 0 ? id : null;
      //si se eliminó el usuario (affected > 0), se devuelve un objeto parcial con el id del usuario eliminado.
      // Si no se afectó ningún registro, se devuelve null.
    } catch (error) {
      console.log('error en eliminar el usuario', error);
    }
  }
  async loginUser(user: LoginUserDto) {
    try {
      const userFound = await this.usersRepository.findOneBy({
        email: user.email,
      });
      if (!userFound) {
        throw new UnauthorizedException('User not found');
      }
      const isPasswordValid = await bcrypt.compare(
        userFound.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
      const payload = { userId: userFound.id, email: userFound.email };
      const token = this.jwtService.sign(payload, { expiresIn: '1h' });
      return {
        user: {
          id: userFound.id,
          email: userFound.email,
          name: userFound.name,
        },
        token,
      };
    } catch (error) {
      throw new UnauthorizedException(
        `error al iniciar sesión, intente nuevamente ${error}`,
      );
    }
  }
}
