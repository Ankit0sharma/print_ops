import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CalendarService } from './calendar.service';
import { CalendarEvent } from '../../entities/calendar-event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { FilterEventsInput } from './dto/filter-events.input';
import { EventStatus } from '../../common/enums/calendar.enum';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => CalendarEvent)
export class CalendarResolver {
  constructor(private readonly calendarService: CalendarService) {}

  @Query(() => [CalendarEvent])
  async getAllEvents(
    @Args('filter', { nullable: true }) filter?: FilterEventsInput,
  ): Promise<CalendarEvent[]> {
    return this.calendarService.findAll(filter);
  }

  @Query(() => CalendarEvent)
  async getEvent(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<CalendarEvent> {
    return this.calendarService.findOne(id);
  }

  @Query(() => [CalendarEvent])
  async getUpcomingEvents(
    @Args('userId', { type: () => ID }, ParseUUIDPipe) userId: string,
    @Args('days', { type: () => Number, nullable: true }) days?: number,
  ): Promise<CalendarEvent[]> {
    return this.calendarService.getUpcomingEvents(userId, days);
  }

  @Query(() => [CalendarEvent])
  async getDayEvents(
    @Args('date', { type: () => Date }) date: Date,
  ): Promise<CalendarEvent[]> {
    return this.calendarService.getDayEvents(date);
  }

  @Mutation(() => CalendarEvent)
  async createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
  ): Promise<CalendarEvent> {
    return this.calendarService.create(createEventInput);
  }

  @Mutation(() => CalendarEvent)
  async updateEvent(
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ): Promise<CalendarEvent> {
    return this.calendarService.update(updateEventInput.id, updateEventInput);
  }

  @Mutation(() => Boolean)
  async deleteEvent(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return this.calendarService.remove(id);
  }

  @Mutation(() => CalendarEvent)
  async updateEventStatus(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('status', { type: () => EventStatus }) status: EventStatus,
  ): Promise<CalendarEvent> {
    return this.calendarService.updateStatus(id, status);
  }
}
