import { SetMetadata } from "@nestjs/common";
import { Roles } from "src/enums/role.enum";

export const RoleUser = (...role: Roles[]) => SetMetadata('Roles', role) 