import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarService } from './calendar.service';
import { CalendarResolver } from './calendar.resolver';
import { CalendarEvent } from '../../entities/calendar-event.entity';
import { Job } from '../../entities/job.entity';
import { User } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEvent, Job, User])],
  providers: [CalendarService, CalendarResolver],
  exports: [CalendarService],
})
export class CalendarModule {}
