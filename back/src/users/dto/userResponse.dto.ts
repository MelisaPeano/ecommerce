import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/entitys/order.entity";

export class userResponseDto {
  @ApiProperty({ example: 'Pepito Perez' })
  name: string;
  @ApiProperty({ example: 'PepitoPerez@gmail.com' })
  email: string;
  @ApiProperty({ example: 'Calle 123' })
  address: string;
  @ApiProperty({ example: '1234567890' })
  phone: number;
  @ApiProperty({ example: 'Colombia' })
  country?: string | undefined;
  @ApiProperty({ example: 'Bogotá' })
  city?: string | undefined;
  @ApiProperty({ type: [Order] })
  orders?: Order[];

  constructor(user: Partial<userResponseDto>) {
    const { name, email, address, phone, country, city } = user;
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.country = country;
    this.city = city;
  }
}
// tengo el control de instanciar el objeto de acuerdo con la necesidad.
