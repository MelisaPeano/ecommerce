import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { Roles } from '../../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    name: 'name',
    type: String,
    description: 'name del usuario entre 3 y 80 caracteres',
  })
  @IsOptional() 
  @IsString()
  @Length(3, 80)
  name: string;
  @ApiProperty({
    name: 'email',
    type: String,
    description: 'email del usuario',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({
    name: 'password',
    type: String,
    description: 'contraseña del usuario entre 8 y 15 caracteres, La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial: !@#$%^&*',
  })
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial: !@#$%^&*',
  })
  password: string;
  @ApiProperty({
    name: 'address',
    type: String,
    description: 'direccion del usuario entre 3 y 80 caracteres',
  })
  @IsOptional()
  @IsString()
  @Length(3, 80)
  address?: string;
  @ApiProperty({
    name: 'phone',
    type: Number,
    description: 'telefono del usuario entre 3 y 80 caracteres',
  })
  @IsNumber()
  @IsOptional()
  phone?: number;
  @ApiProperty({
    name: 'country',
    type: String,
    description: 'pais del usuario entre 5 y 20 caracteres',
  })
  @IsOptional() 
  @IsString()
  @Length(5, 20)
  country?: string;
  @ApiProperty({
    name: 'city',
    type: String,
    description: 'ciudad del usuario entre 5 y 20 caracteres',
  })
  @IsOptional()  
  @IsString()
  @Length(5, 20)
  city?: string;
  @IsEnum(Roles)
  @IsOptional()
  role?: Roles;
  @ApiProperty({
    name: 'repetPassword',
    type: String,
    description: 'repetir contraseña del usuario',
  })
  @IsNotEmpty()
  @Validate(Matches, ['password'])  // Asegura que 'password' y 'repetPassword' coincidan
  repetPassword: string;
  }

