import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    name: 'email',
    type: String, 
    description: 'email del usuario' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({
    name: 'password',
    type: String, 
    description: 'password del usuario' })
  @IsNotEmpty()
  password: string;
}
