import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserReq = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const user =
      ctx.switchToHttp().getRequest()?.user ||
      ctx.switchToWs().getClient()?.user;
    return user;
  },
);
