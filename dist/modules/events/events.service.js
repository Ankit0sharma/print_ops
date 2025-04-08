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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("../../entities/event.entity");
let EventService = class EventService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    // Create a new event
    async createEvent(createEventInput) {
        try {
            // Validate that end time is after start time
            if (createEventInput.endTime <= createEventInput.startTime) {
                throw new common_1.BadRequestException('End time must be after start time');
            }
            const newEvent = this.eventRepository.create(createEventInput);
            return this.eventRepository.save(newEvent);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    // Find all events
    async findAll() {
        return this.eventRepository.find({
            relations: ['job'],
        });
    }
    // Find events by date range
    async findByDateRange(startDate, endDate) {
        return this.eventRepository.find({
            where: [
                // Events that start within the range
                { startTime: (0, typeorm_2.Between)(startDate, endDate) },
                // Events that end within the range
                { endTime: (0, typeorm_2.Between)(startDate, endDate) },
                // Events that span the entire range
                {
                    startTime: (0, typeorm_2.LessThanOrEqual)(startDate),
                    endTime: (0, typeorm_2.MoreThanOrEqual)(endDate),
                },
            ],
            relations: ['job'],
            order: {
                startTime: 'ASC',
            },
        });
    }
    // Find events for today
    async findToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return this.findByDateRange(today, tomorrow);
    }
    // Find events for tomorrow
    async findTomorrow() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
        return this.findByDateRange(tomorrow, dayAfterTomorrow);
    }
    // Find events by type
    async findByType(type) {
        return this.eventRepository.find({
            where: { type: type },
            relations: ['job'],
            order: {
                startTime: 'ASC',
            },
        });
    }
    // Find events by job
    async findByJob(jobId) {
        return this.eventRepository.find({
            where: { jobId },
            relations: ['job'],
            order: {
                startTime: 'ASC',
            },
        });
    }
    // Find a event by ID
    async findOne(id) {
        const event = await this.eventRepository.findOne({
            where: { id },
            relations: ['job'],
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    // Update an event
    async updateEvent(id, updateEventInput) {
        try {
            const event = await this.findOne(id);
            // If updating times, validate that end time is after start time
            if (updateEventInput.startTime || updateEventInput.endTime) {
                const startTime = updateEventInput.startTime || event.startTime;
                const endTime = updateEventInput.endTime || event.endTime;
                if (endTime <= startTime) {
                    throw new common_1.BadRequestException('End time must be after start time');
                }
            }
            Object.assign(event, updateEventInput);
            return this.eventRepository.save(event);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    // Delete an event
    async deleteEvent(id) {
        try {
            const event = await this.findOne(id);
            await this.eventRepository.remove(event);
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EventService);
//# sourceMappingURL=events.service.js.map