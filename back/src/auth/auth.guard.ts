import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

import * as jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env.development' });

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Este método se llama para determinar si una ruta está protegida y si el acceso debe ser permitido o no.
    const request = context.switchToHttp().getRequest();
    // Se obtiene el objeto de solicitud HTTP del contexto actual.
    const token = request.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('Falta el Token de acceso');
    }

    const tokenAccess = token.split(' ')[1];
    if (!tokenAccess) {
      throw new UnauthorizedException('falta el token de acceso');
    }
    try {
      const secretKey = process.env.JWT_SECRET;
      const decodedToken = jwt.verify(tokenAccess, secretKey) as {
        exp: number;
        userId: string;
        email: string;
      };

      request.user = {
        userId: decodedToken.userId,
        email: decodedToken.email,
        expiresAt: new Date(decodedToken.exp * 1000), // Expiration time in milliseconds
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException(`Invalid or expired token ${error}`);
    }
  }
}
