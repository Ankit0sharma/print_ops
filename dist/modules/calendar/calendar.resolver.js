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
exports.CalendarResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const calendar_service_1 = require("./calendar.service");
const calendar_event_entity_1 = require("../../entities/calendar-event.entity");
const create_event_input_1 = require("./dto/create-event.input");
const update_event_input_1 = require("./dto/update-event.input");
const filter_events_input_1 = require("./dto/filter-events.input");
const calendar_enum_1 = require("../../common/enums/calendar.enum");
const common_1 = require("@nestjs/common");
let CalendarResolver = class CalendarResolver {
    constructor(calendarService) {
        this.calendarService = calendarService;
    }
    async getAllEvents(filter) {
        return this.calendarService.findAll(filter);
    }
    async getEvent(id) {
        return this.calendarService.findOne(id);
    }
    async getUpcomingEvents(userId, days) {
        return this.calendarService.getUpcomingEvents(userId, days);
    }
    async getDayEvents(date) {
        return this.calendarService.getDayEvents(date);
    }
    async createEvent(createEventInput) {
        return this.calendarService.create(createEventInput);
    }
    async updateEvent(updateEventInput) {
        return this.calendarService.update(updateEventInput.id, updateEventInput);
    }
    async deleteEvent(id) {
        return this.calendarService.remove(id);
    }
    async updateEventStatus(id, status) {
        return this.calendarService.updateStatus(id, status);
    }
};
exports.CalendarResolver = CalendarResolver;
__decorate([
    (0, graphql_1.Query)(() => [calendar_event_entity_1.CalendarEvent]),
    __param(0, (0, graphql_1.Args)('filter', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_events_input_1.FilterEventsInput]),
    __metadata("design:returntype", Promise)
], CalendarResolver.prototype, "getAllEvents", null);
__decorate([
    (0, graphql_1.Query)(() => calendar_event_entity_1.CalendarEvent),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID }, common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CalendarResolver.prototype, "getEvent", null);
__decorate([
    (0, graphql_1.Query)(() => [calendar_event_entity_1.CalendarEvent]),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.ID }, common_1.ParseUUIDPipe)),
    __param(1, (0, graphql_1.Args)('days', { type: () => Number, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], CalendarResolver.prototype, "getUpcomingEvents", null);
__decorate([
    (0, graphql_1.Query)(() => [calendar_event_entity_1.CalendarEvent]),
    __param(0, (0, graphql_1.Args)('date', { type: () => Date })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date]),
    __metadata("design:returntype", Promise)
], CalendarResolver.prototype, "getDayEvents", null);
__decorate([
    (0, graphql_1.Mutation)(() => calendar_event_entity_1.CalendarEvent),
    __param(0, (0, graphql_1.Args)('createEventInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_input_1.CreateEventInput]),
    __metadata("design:returntype", Promise)
], CalendarResolver.prototype, "createEvent", null);
__decorate([
    (0, graphql_1.Mutation)(() => calendar_event_entity_1.CalendarEvent),
    __param(0, (0, graphql_1.Args)('updateEventInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_event_input_1.UpdateEventInput]),
    __metadata("design:returntype", Promise)
], CalendarResolver.prototype, "updateEvent", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID }, common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CalendarResolver.prototype, "deleteEvent", null);
__decorate([
    (0, graphql_1.Mutation)(() => calendar_event_entity_1.CalendarEvent),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID }, common_1.ParseUUIDPipe)),
    __param(1, (0, graphql_1.Args)('status', { type: () => calendar_enum_1.EventStatus })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CalendarResolver.prototype, "updateEventStatus", null);
exports.CalendarResolver = CalendarResolver = __decorate([
    (0, graphql_1.Resolver)(() => calendar_event_entity_1.CalendarEvent),
    __metadata("design:paramtypes", [calendar_service_1.CalendarService])
], CalendarResolver);
//# sourceMappingURL=calendar.resolver.js.map