import { registerEnumType } from '@nestjs/graphql';

export enum EventType {
  INSTALLATION = 'installation',
  MEETING = 'meeting',
  DEADLINE = 'deadline',
  REMINDER = 'reminder'
}

export enum EventStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum EventRepeatType {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

registerEnumType(EventType, {
  name: 'EventType',
  description: 'Types of calendar events',
});

registerEnumType(EventStatus, {
  name: 'EventStatus',
  description: 'Status of calendar events',
});

registerEnumType(EventRepeatType, {
  name: 'EventRepeatType',
  description: 'Event repeat frequency',
});
