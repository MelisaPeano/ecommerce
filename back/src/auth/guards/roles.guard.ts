import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "src/enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor( private readonly reflect: Reflector ){} // me permite leer metadata(roles)
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflect.getAllAndOverride<Roles[]>('roles', [ context.getHandler(), context.getClass()]);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () =>
      requireRoles.some((role) => user?.role?.includes(role))
    const valid = user && user.role && hasRole();
    if(!valid) {
      throw new ForbiddenException(
        'You do not have permisson are not allowed to access this route'
      );
    }
    return valid;
  }

}