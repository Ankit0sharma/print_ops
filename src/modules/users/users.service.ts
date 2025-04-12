import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Role } from '../../entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
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

      const newUser = this.userRepository.create({
        ...createUserInput,
        status: 'active',
        lastActiveAt: new Date(),
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Find user by email
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  // Find a user by ID
  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['role'],
      order: { createdAt: 'DESC' },
    });
  }

  // Update user's last active timestamp
  async updateLastActive(id: string): Promise<void> {
    await this.userRepository.update(id, {
      lastActiveAt: new Date()
    });
  }

  // Validate a user by checking email and password
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (password !== user.password) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new BadRequestException('User account is inactive');
    }

    // Update last active timestamp
    await this.updateLastActive(user.id);

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

  // Find all roles with permissions
  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.find({
      relations: ['permissions'],
      order: { id: 'ASC' }
    });
  }
}
