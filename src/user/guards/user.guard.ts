import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JWT_KEY } from '../jwt/jwt.constant';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      let token: null | undefined | string = null;
      const httpContext = context.switchToHttp().getRequest();
      token = httpContext.headers[JWT_KEY];
      if (token) {
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const userId = Number(decoded['id']);
          const { status, user } = await this.userService.findUser({
            id: userId,
          });
          if (status && user) {
            httpContext['user'] = user;
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
