import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const decoratorSkip =
      this.reflector.get('AUTH_SKIP', context.getClass()) ||
      this.reflector.get('AUTH_SKIP', context.getHandler());

    if (decoratorSkip) {
      return true;
    }

    return super.canActivate(context);
  }
}
