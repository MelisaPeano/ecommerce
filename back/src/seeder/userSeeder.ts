import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entitys/users.entity";
import { Repository } from "typeorm";
import userData from "./data/userData.json";
import { Roles } from "src/enums/role.enum";
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
export class UserSeed {
  constructor(
    @InjectRepository(Users)
    private readonly usersService: Repository<Users>,
  ) {}
  async seed() {
    const existingProductsNames = (await this.usersService.find()).map(
      (user) => user.name,
    );
  
    for (const users of userData) {
      if (!existingProductsNames.includes(users.name)) {
        const newUser = new Users();
        if (users.password) {
          const salt = await bcrypt.genSalt();
          const hash = await bcrypt.hash(users.password, salt);
          newUser.password = hash;
        } else {
          console.log(`Error: La contraseña de ${users.name} no está definida en el archivo userData.json`);
          continue;
        }
        newUser.id= uuid();
        newUser.name= users.name;
        newUser.email= users.email;
        newUser.address= users.address;
        newUser.role = Roles.ADMIN
        await this.usersService.save(newUser);
      }
    }
  }
}