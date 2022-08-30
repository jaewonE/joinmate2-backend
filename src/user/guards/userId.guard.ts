import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JWT_KEY } from '../jwt/jwt.constant';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class JwtIdGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    try {
      let token: null | undefined | string = null;
      const httpContext = context.switchToHttp().getRequest();
      token = httpContext.headers[JWT_KEY];
      if (token) {
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const userId = Number(decoded['id']);
          if (userId) {
            httpContext['userId'] = userId;
            return true;
          }
        }
      }
    } catch (e: any) {
      return false;
    }
    return false;
  }
}
