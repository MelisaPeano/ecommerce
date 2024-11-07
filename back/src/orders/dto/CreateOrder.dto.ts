import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Products } from 'src/entitys/products.entity';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;
  @IsArray()
  @ArrayNotEmpty({ message: 'Debe contener al menos un producto.' })
  @ValidateNested({ each: true })
  @Type(() => Products)
  products: Products[];
}
