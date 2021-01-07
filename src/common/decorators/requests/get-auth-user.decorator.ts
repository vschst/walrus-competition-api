import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtAuthUser } from '@auth/interfaces/jwt-auth-user.interface';

export const GetAuthUser = createParamDecorator(
  (data, ctx: ExecutionContext): IJwtAuthUser => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);
