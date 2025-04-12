import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserPermission, ROLE_PERMISSIONS } from '../enums/user.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<UserPermission[]>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredPermissions) {
      return true; // No permissions required
    }

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user) {
      return false;
    }

    const userPermissions = ROLE_PERMISSIONS[user.role] || [];

    // Admin has all permissions
    if (user.role === 'admin') {
      return true;
    }

    return requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    );
  }
}
