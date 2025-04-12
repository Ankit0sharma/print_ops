import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UsersModule {}
