import { registerEnumType } from '@nestjs/graphql';

export enum JobStatus {
  DESIGN = 'Design',
  PRODUCTION = 'Production',
  PRINT = 'Print',
  APPROVAL = 'Approval',
  COMPLETED = 'Completed'
}

export enum JobPriority {
  LOW = 'Low',
  NORMAL = 'Normal',
  HIGH = 'High',
  URGENT = 'Urgent'
}

export enum JobSortField {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  DUE_DATE_SOONEST = 'due_date_soonest',
  DUE_DATE_LATEST = 'due_date_latest',
  PRIORITY_HIGH_LOW = 'priority_high_low',
  DEFAULT = 'default'
}

registerEnumType(JobStatus, {
  name: 'JobStatus',
  description: 'Available job statuses'
});

registerEnumType(JobPriority, {
  name: 'JobPriority',
  description: 'Job priority levels'
});

registerEnumType(JobSortField, {
  name: 'JobSortField',
  description: 'Job sorting options'
});
