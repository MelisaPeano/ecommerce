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
import { Roles } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsOptional() 
  @IsString()
  @Length(3, 80)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial: !@#$%^&*',
  })
  password: string;
  @IsOptional()
  @IsString()
  @Length(3, 80)
  address?: string;
  @IsNumber()
  @IsOptional()
  phone?: number;
  @IsOptional() 
  @IsString()
  @Length(5, 20)
  country?: string;
  @IsOptional()  
  @IsString()
  @Length(5, 20)
  city?: string;
  @IsEnum(Roles)
  @IsOptional()
  role?: Roles;
  @IsNotEmpty()
  @Validate(Matches, ['password'])  // Asegura que 'password' y 'repetPassword' coincidan
  repetPassword: string;
  }

