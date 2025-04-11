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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarEvent = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const calendar_enum_1 = require("../common/enums/calendar.enum");
const user_entity_1 = require("./user.entity");
const job_entity_1 = require("./job.entity");
let CalendarEvent = class CalendarEvent {
};
exports.CalendarEvent = CalendarEvent;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CalendarEvent.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CalendarEvent.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => calendar_enum_1.EventType),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: calendar_enum_1.EventType,
    }),
    __metadata("design:type", String)
], CalendarEvent.prototype, "eventType", void 0);
__decorate([
    (0, graphql_1.Field)(() => calendar_enum_1.EventStatus),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: calendar_enum_1.EventStatus,
        default: calendar_enum_1.EventStatus.SCHEDULED
    }),
    __metadata("design:type", String)
], CalendarEvent.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], CalendarEvent.prototype, "startTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], CalendarEvent.prototype, "endTime", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CalendarEvent.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)(() => calendar_enum_1.EventRepeatType),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: calendar_enum_1.EventRepeatType,
        default: calendar_enum_1.EventRepeatType.NONE
    }),
    __metadata("design:type", String)
], CalendarEvent.prototype, "repeatType", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assignedToId' }),
    __metadata("design:type", user_entity_1.User)
], CalendarEvent.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assignedToId', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CalendarEvent.prototype, "assignedToId", void 0);
__decorate([
    (0, graphql_1.Field)(() => job_entity_1.Job, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => job_entity_1.Job, { eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'jobId' }),
    __metadata("design:type", job_entity_1.Job)
], CalendarEvent.prototype, "relatedJob", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'jobId', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], CalendarEvent.prototype, "jobId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CalendarEvent.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CalendarEvent.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CalendarEvent.prototype, "updatedAt", void 0);
exports.CalendarEvent = CalendarEvent = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('calendar_events')
], CalendarEvent);
//# sourceMappingURL=calendar-event.entity.js.map