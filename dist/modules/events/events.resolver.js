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
exports.EventResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const events_service_1 = require("./events.service");
const event_entity_1 = require("../../entities/event.entity");
const create_event_input_1 = require("./dto/create-event.input");
const update_event_input_1 = require("./dto/update-event.input");
let EventResolver = class EventResolver {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async getAllEvents() {
        return this.eventService.findAll();
    }
    async getEventsByDateRange(startDate, endDate) {
        return this.eventService.findByDateRange(startDate, endDate);
    }
    async getTodayEvents() {
        return this.eventService.findToday();
    }
    async getTomorrowEvents() {
        return this.eventService.findTomorrow();
    }
    async getEventsByType(type) {
        return this.eventService.findByType(type);
    }
    async getEventsByJob(jobId) {
        return this.eventService.findByJob(jobId);
    }
    async getEvent(id) {
        return this.eventService.findOne(id);
    }
    async createEvent(createEventInput) {
        return this.eventService.createEvent(createEventInput);
    }
    async updateEvent(id, updateEventInput) {
        return this.eventService.updateEvent(id, updateEventInput);
    }
    async deleteEvent(id) {
        return this.eventService.deleteEvent(id);
    }
};
exports.EventResolver = EventResolver;
__decorate([
    (0, graphql_1.Query)(() => [event_entity_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "getAllEvents", null);
__decorate([
    (0, graphql_1.Query)(() => [event_entity_1.Event]),
    __param(0, (0, graphql_1.Args)('startDate')),
    __param(1, (0, graphql_1.Args)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "getEventsByDateRange", null);
__decorate([
    (0, graphql_1.Query)(() => [event_entity_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "getTodayEvents", null);
__decorate([
    (0, graphql_1.Query)(() => [event_entity_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "getTomorrowEvents", null);
__decorate([
    (0, graphql_1.Query)(() => [event_entity_1.Event]),
    __param(0, (0, graphql_1.Args)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "getEventsByType", null);
__decorate([
    (0, graphql_1.Query)(() => [event_entity_1.Event]),
    __param(0, (0, graphql_1.Args)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "getEventsByJob", null);
__decorate([
    (0, graphql_1.Query)(() => event_entity_1.Event),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "getEvent", null);
__decorate([
    (0, graphql_1.Mutation)(() => event_entity_1.Event),
    __param(0, (0, graphql_1.Args)('createEventInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_input_1.CreateEventInput]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "createEvent", null);
__decorate([
    (0, graphql_1.Mutation)(() => event_entity_1.Event),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateEventInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_input_1.UpdateEventInput]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "updateEvent", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "deleteEvent", null);
exports.EventResolver = EventResolver = __decorate([
    (0, graphql_1.Resolver)(() => event_entity_1.Event),
    __metadata("design:paramtypes", [events_service_1.EventService])
], EventResolver);
//# sourceMappingURL=events.resolver.js.map