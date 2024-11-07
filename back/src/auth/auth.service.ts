import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { Users } from 'src/entitys/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersService: UsersService,
  ) {}
  getUsers() {
    return 'En esta ruta es de Auth';
  }
  async validateToken(user: LoginUserDto): Promise<boolean> {
    const foundUser = await this.usersService.loginUser(user);
    return !!foundUser;
  }
}
