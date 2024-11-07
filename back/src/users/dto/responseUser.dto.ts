export class UserResponseDto {
  name: string;
  email: string;
  address: string;
  phone: number;
  country?: string | undefined;
  city?: string | undefined;
  orders?: object | object[];

  constructor(user: Partial<UserResponseDto>) {
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
