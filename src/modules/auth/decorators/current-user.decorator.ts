import { CanActivate, createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleBasedAccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    
    // Get required permissions from the @Permissions decorator
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredPermissions) {
      return true; // No permissions required
    }

    if (!user) {
      return false; // No user found
    }

    // Get user's permissions from their role
    const userPermissions = user.permissions || [];

    // Check if user has at least one of the required permissions
    return requiredPermissions.some(permission => 
      userPermissions.includes(permission)
    );
  }
}
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);
    return context.getContext().req.user;
  },
);
