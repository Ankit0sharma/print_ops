import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from '../../entities/customer.entity';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Query(() => Customer)
  async customer(@Args('id', { type: () => ID }) id: string): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Args('customerData') customerData: Partial<Customer>,
  ): Promise<Customer> {
    return this.customerService.create(customerData);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('id', { type: () => ID }) id: string,
    @Args('customerData') customerData: Partial<Customer>,
  ): Promise<Customer> {
    return this.customerService.update(id, customerData);
  }

  @Mutation(() => Boolean)
  async removeCustomer(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.customerService.remove(id);
  }
}
