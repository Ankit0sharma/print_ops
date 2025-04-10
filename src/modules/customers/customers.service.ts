import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Customer } from '../../entities/customer.entity';
import { CustomerType, CustomerStatus } from '../../common/enums/customer.enum';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { FilterCustomerInput } from './dto/filter-customer.input';
import { SortCustomerInput, CustomerSortField } from './dto/sort-customer.input';
import { SortOrder } from '../../common/enums/sort.enum';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    try {
      // Check if customer with this email already exists
      const existingCustomer = await this.findByEmail(createCustomerInput.email);
      if (existingCustomer) {
        throw new BadRequestException('Email is already in use by another customer');
      }

      const customer = this.customerRepository.create(createCustomerInput);
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(filter?: FilterCustomerInput, sort?: SortCustomerInput): Promise<Customer[]> {
    const queryBuilder = this.customerRepository.createQueryBuilder('customer')
      .leftJoinAndSelect('customer.jobs', 'jobs');

    // Apply filters
    if (filter) {
      if (filter.status) {
        queryBuilder.andWhere('customer.status = :status', { status: filter.status });
      }
      if (filter.customerType) {
        queryBuilder.andWhere('customer.customerType = :type', { type: filter.customerType });
      }
      if (filter.isActive !== undefined) {
        queryBuilder.andWhere('customer.isActive = :isActive', { isActive: filter.isActive });
      }
      if (filter.searchTerm) {
        queryBuilder.andWhere(
          '(LOWER(customer.companyName) LIKE LOWER(:search) OR '
          + 'LOWER(customer.firstName) LIKE LOWER(:search) OR '
          + 'LOWER(customer.lastName) LIKE LOWER(:search) OR '
          + 'LOWER(customer.email) LIKE LOWER(:search))',
          { search: `%${filter.searchTerm}%` }
        );
      }
    }

    // Apply sorting
    if (sort) {
      switch (sort.field) {
        case CustomerSortField.NAME:
          queryBuilder.orderBy('customer.firstName', sort.order);
          break;
        case CustomerSortField.EMAIL:
          queryBuilder.orderBy('customer.email', sort.order);
          break;
        default:
          queryBuilder.orderBy('customer.firstName', SortOrder.ASC);
      }
    } else {
      queryBuilder.orderBy('customer.firstName', SortOrder.ASC);
    }

    return await queryBuilder.getMany();
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return await this.customerRepository.findOne({ where: { email } });
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ 
      where: { id },
      relations: ['jobs'] 
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async updateCustomer(id: string, updateCustomerInput: UpdateCustomerInput): Promise<Customer> {
    try {
      const customer = await this.findOne(id);
      
      // If email is being updated, check if it's already in use
      if (updateCustomerInput.email && updateCustomerInput.email !== customer.email) {
        const existingCustomer = await this.findByEmail(updateCustomerInput.email);
        if (existingCustomer && existingCustomer.id !== id) {
          throw new BadRequestException('Email is already in use by another customer');
        }
      }
      
      Object.assign(customer, updateCustomerInput);
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteCustomer(id: string): Promise<boolean> {
    try {
      const customer = await this.findOne(id);
      await this.customerRepository.remove(customer);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateStatus(id: string, status: CustomerStatus): Promise<Customer> {
    const customer = await this.findOne(id);
    customer.status = status;
    return await this.customerRepository.save(customer);
  }

  async updateType(id: string, customerType: CustomerType): Promise<Customer> {
    const customer = await this.findOne(id);
    customer.customerType = customerType;
    return await this.customerRepository.save(customer);
  }

  async findActive(): Promise<Customer[]> {
    return this.customerRepository.find({
      where: { status: CustomerStatus.ACTIVE }
    });
  }

  async findInactive(): Promise<Customer[]> {
    return this.customerRepository.find({
      where: { status: CustomerStatus.INACTIVE }
    });
  }
}
