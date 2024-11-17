import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService){}
  async createUser(user: CreateUserDto) {
    try {
      const foundUser = await this.usersService.createUser(user);
      return foundUser;
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  async loginUser(user: LoginUserDto) {
    try {
      const foundUser = await this.usersService.loginUser(user);
      return foundUser;
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }

}
