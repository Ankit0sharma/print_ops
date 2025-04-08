import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  // Create a new customer
  async createCustomer(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    try {
      // Check if customer with this email already exists
      const existingCustomer = await this.customerRepository.findOne({
        where: { email: createCustomerInput.email },
      });

      if (existingCustomer) {
        throw new BadRequestException('Email is already in use by another customer');
      }

      const newCustomer = this.customerRepository.create(createCustomerInput);
      return this.customerRepository.save(newCustomer);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Find all customers
  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  // Find active customers
  async findActive(): Promise<Customer[]> {
    return this.customerRepository.find({
      where: { isActive: true },
    });
  }

  // Find inactive customers
  async findInactive(): Promise<Customer[]> {
    return this.customerRepository.find({
      where: { isActive: false },
    });
  }

  // Find favorite customers
  async findFavorites(): Promise<Customer[]> {
    return this.customerRepository.find({
      where: { isFavorite: true },
    });
  }

  // Find a customer by ID
  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['jobs'],
    });
    
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    
    return customer;
  }

  // Find a customer by email
  async findByEmail(email: string): Promise<Customer> {
    return this.customerRepository.findOne({
      where: { email },
    });
  }

  // Update a customer
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
      return this.customerRepository.save(customer);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Toggle favorite status
  async toggleFavorite(id: string): Promise<Customer> {
    const customer = await this.findOne(id);
    customer.isFavorite = !customer.isFavorite;
    return this.customerRepository.save(customer);
  }

  // Delete a customer
  async deleteCustomer(id: string): Promise<boolean> {
    try {
      const customer = await this.findOne(id);
      await this.customerRepository.remove(customer);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
