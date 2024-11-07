import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, UsersModule, JwtModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, AuthService, UsersService, JwtService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
