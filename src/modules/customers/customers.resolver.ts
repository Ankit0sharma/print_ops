import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './customers.service';
import { Customer } from '../../entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async getAllCustomers(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Query(() => [Customer])
  async getActiveCustomers(): Promise<Customer[]> {
    return this.customerService.findActive();
  }

  @Query(() => [Customer])
  async getInactiveCustomers(): Promise<Customer[]> {
    return this.customerService.findInactive();
  }

  @Query(() => [Customer])
  async getFavoriteCustomers(): Promise<Customer[]> {
    return this.customerService.findFavorites();
  }

  @Query(() => Customer)
  async getCustomer(@Args('id') id: string): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.createCustomer(createCustomerInput);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('id') id: string,
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.updateCustomer(id, updateCustomerInput);
  }

  @Mutation(() => Customer)
  async toggleCustomerFavorite(@Args('id') id: string): Promise<Customer> {
    return this.customerService.toggleFavorite(id);
  }

  @Mutation(() => Boolean)
  async deleteCustomer(@Args('id') id: string): Promise<boolean> {
    return this.customerService.deleteCustomer(id);
  }
}
