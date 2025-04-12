import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])  
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => [Role])
  async getRoles(): Promise<Role[]> {
    return this.userService.findAllRoles();
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string, 
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.userService.updateUser(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    await this.userService.deleteUser(id);
    return true;
  }
}