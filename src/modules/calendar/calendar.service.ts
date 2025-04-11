import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';
import { CalendarEvent } from '../../entities/calendar-event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { FilterEventsInput } from './dto/filter-events.input';
import { EventStatus } from '../../common/enums/calendar.enum';
import { Job } from '../../entities/job.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarEvent)
    private readonly eventRepository: Repository<CalendarEvent>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createEventInput: CreateEventInput): Promise<CalendarEvent> {
    // Verify user exists
    const user = await this.userRepository.findOne({
      where: { id: createEventInput.assignedToId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${createEventInput.assignedToId} not found`);
    }

    // Verify job exists if jobId is provided
    if (createEventInput.jobId) {
      const job = await this.jobRepository.findOne({
        where: { id: createEventInput.jobId },
        relations: ['customer', 'assignedTo'],
      });
      if (!job) {
        throw new NotFoundException(`Job with ID ${createEventInput.jobId} not found`);
      }
    }

    const event = this.eventRepository.create({
      ...createEventInput,
      status: EventStatus.SCHEDULED,
    });

    const savedEvent = await this.eventRepository.save(event);
    
    // Fetch the complete event with all relations
    return this.findOne(savedEvent.id);
  }

  async findAll(filter?: FilterEventsInput): Promise<CalendarEvent[]> {
    const queryBuilder = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.assignedTo', 'assignedTo')
      .leftJoinAndSelect('event.relatedJob', 'relatedJob')
      .leftJoinAndSelect('relatedJob.customer', 'customer')
      .leftJoinAndSelect('relatedJob.assignedTo', 'jobAssignedTo')
      .orderBy('event.startTime', 'ASC');

    if (filter) {
      if (filter.eventTypes?.length) {
        queryBuilder.andWhere('event.eventType IN (:...eventTypes)', {
          eventTypes: filter.eventTypes,
        });
      }

      if (filter.statuses?.length) {
        queryBuilder.andWhere('event.status IN (:...statuses)', {
          statuses: filter.statuses,
        });
      }

      if (filter.assignedToId) {
        queryBuilder.andWhere('assignedTo.id = :assignedToId', {
          assignedToId: filter.assignedToId,
        });
      }

      if (filter.jobId) {
        queryBuilder.andWhere('relatedJob.id = :jobId', {
          jobId: filter.jobId,
        });
      }

      if (filter.startDate && filter.endDate) {
        queryBuilder.andWhere(
          'event.startTime BETWEEN :startDate AND :endDate',
          {
            startDate: filter.startDate,
            endDate: filter.endDate,
          },
        );
      }
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<CalendarEvent> {
    const event = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.assignedTo', 'assignedTo')
      .leftJoinAndSelect('event.relatedJob', 'relatedJob')
      .leftJoinAndSelect('relatedJob.customer', 'customer')
      .leftJoinAndSelect('relatedJob.assignedTo', 'jobAssignedTo')
      .where('event.id = :id', { id })
      .getOne();

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: string, updateEventInput: UpdateEventInput): Promise<CalendarEvent> {
    const event = await this.findOne(id);
    
    // Update only the provided fields
    Object.assign(event, updateEventInput);
    
    return this.eventRepository.save(event);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.eventRepository.delete(id);
    return result.affected > 0;
  }

  async updateStatus(id: string, status: EventStatus): Promise<CalendarEvent> {
    const event = await this.findOne(id);
    event.status = status;
    return this.eventRepository.save(event);
  }

  async getUpcomingEvents(userId: string, days: number = 7): Promise<CalendarEvent[]> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    return this.eventRepository.find({
      where: {
        assignedTo: { id: userId },
        startTime: Between(startDate, endDate),
      },
      relations: ['assignedTo', 'relatedJob'],
      order: { startTime: 'ASC' },
    });
  }

  async getDayEvents(date: Date): Promise<CalendarEvent[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.eventRepository.find({
      where: {
        startTime: Between(startOfDay, endOfDay),
      },
      relations: ['assignedTo', 'relatedJob'],
      order: { startTime: 'ASC' },
    });
  }
}
