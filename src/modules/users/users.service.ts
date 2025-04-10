import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(createUserInput: CreateUserInput): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserInput.email },
      });

      if (existingUser) {
        throw new BadRequestException('Email is already in use');
      }

      // Hash password before saving
      // const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
      const newUser = this.userRepository.create({
        ...createUserInput,
      });

      return this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Find user by email
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  // Find a user by ID
  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  // Validate a user by checking email and password
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if(password !== user.password){
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  // Update a user
  async updateUser(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      Object.assign(user, updateUserInput);
      return this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find(); 
  }

  // Delete a user
  async deleteUser(id: string): Promise<void> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userRepository.remove(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
