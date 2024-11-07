import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial: !@#$%^&*',
  })
  password?: string;
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address?: string;
  @IsNotEmpty()
  @IsNumber()
  phone?: number;
  @IsString()
  @Length(5, 20)
  country?: string;
  @IsString()
  @Length(5, 20)
  city?: string;
}
