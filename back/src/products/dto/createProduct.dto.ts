import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class createProductDto {
  @ApiProperty({
    name: 'name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'description',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string;  

  @ApiProperty({
    name: 'price',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    name: 'stock',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({ 
    name: 'imgUrl',
    type: String, 
  })
  @ApiProperty({
    name: 'category',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  constructor(partial: Partial<createProductDto>) {
    Object.assign(this, partial);
  }
}