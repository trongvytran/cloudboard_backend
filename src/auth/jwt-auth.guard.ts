import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authorization = req.headers['authorization'];
    let bearer = '';

    if (typeof authorization != 'undefined') {
      bearer = authorization.replace('Bearer ', '');
    }

    if (bearer === '') {
      throw new UnauthorizedException('No Token provided!');
    }

    const tokenDecoded: any = this.jwtService.decode(bearer);
    const role = this.reflector.get<string[]>('role', context.getHandler());

    if (role === tokenDecoded.role) {
      return true;
    }

    if (role === undefined) {
      return true;
    }
    throw new ForbiddenException(`Only ${role} can access resources`);
  }
}
