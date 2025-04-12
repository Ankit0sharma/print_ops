import { SetMetadata } from '@nestjs/common';
import { UserPermission } from '../enums/user.enum';

export const RequirePermissions = (...permissions: UserPermission[]) => 
  SetMetadata('permissions', permissions);
