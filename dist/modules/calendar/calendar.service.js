"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const calendar_event_entity_1 = require("../../entities/calendar-event.entity");
const calendar_enum_1 = require("../../common/enums/calendar.enum");
const job_entity_1 = require("../../entities/job.entity");
const user_entity_1 = require("../../entities/user.entity");
let CalendarService = class CalendarService {
    constructor(eventRepository, jobRepository, userRepository) {
        this.eventRepository = eventRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }
    async create(createEventInput) {
        // Verify user exists
        const user = await this.userRepository.findOne({
            where: { id: createEventInput.assignedToId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${createEventInput.assignedToId} not found`);
        }
        // Verify job exists if jobId is provided
        if (createEventInput.jobId) {
            const job = await this.jobRepository.findOne({
                where: { id: createEventInput.jobId },
                relations: ['customer', 'assignedTo'],
            });
            if (!job) {
                throw new common_1.NotFoundException(`Job with ID ${createEventInput.jobId} not found`);
            }
        }
        const event = this.eventRepository.create({
            ...createEventInput,
            status: calendar_enum_1.EventStatus.SCHEDULED,
        });
        const savedEvent = await this.eventRepository.save(event);
        // Fetch the complete event with all relations
        return this.findOne(savedEvent.id);
    }
    async findAll(filter) {
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
                queryBuilder.andWhere('event.startTime BETWEEN :startDate AND :endDate', {
                    startDate: filter.startDate,
                    endDate: filter.endDate,
                });
            }
        }
        return queryBuilder.getMany();
    }
    async findOne(id) {
        const event = await this.eventRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.assignedTo', 'assignedTo')
            .leftJoinAndSelect('event.relatedJob', 'relatedJob')
            .leftJoinAndSelect('relatedJob.customer', 'customer')
            .leftJoinAndSelect('relatedJob.assignedTo', 'jobAssignedTo')
            .where('event.id = :id', { id })
            .getOne();
        if (!event) {
            throw new common_1.NotFoundException(`Event with ID ${id} not found`);
        }
        return event;
    }
    async update(id, updateEventInput) {
        const event = await this.findOne(id);
        // Update only the provided fields
        Object.assign(event, updateEventInput);
        return this.eventRepository.save(event);
    }
    async remove(id) {
        const result = await this.eventRepository.delete(id);
        return result.affected > 0;
    }
    async updateStatus(id, status) {
        const event = await this.findOne(id);
        event.status = status;
        return this.eventRepository.save(event);
    }
    async getUpcomingEvents(userId, days = 7) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + days);
        return this.eventRepository.find({
            where: {
                assignedTo: { id: userId },
                startTime: (0, typeorm_2.Between)(startDate, endDate),
            },
            relations: ['assignedTo', 'relatedJob'],
            order: { startTime: 'ASC' },
        });
    }
    async getDayEvents(date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        return this.eventRepository.find({
            where: {
                startTime: (0, typeorm_2.Between)(startOfDay, endOfDay),
            },
            relations: ['assignedTo', 'relatedJob'],
            order: { startTime: 'ASC' },
        });
    }
};
exports.CalendarService = CalendarService;
exports.CalendarService = CalendarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(calendar_event_entity_1.CalendarEvent)),
    __param(1, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CalendarService);
//# sourceMappingURL=calendar.service.js.map