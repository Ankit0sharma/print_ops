"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const calendar_service_1 = require("./calendar.service");
const calendar_resolver_1 = require("./calendar.resolver");
const calendar_event_entity_1 = require("../../entities/calendar-event.entity");
const job_entity_1 = require("../../entities/job.entity");
const user_entity_1 = require("../../entities/user.entity");
let CalendarModule = class CalendarModule {
};
exports.CalendarModule = CalendarModule;
exports.CalendarModule = CalendarModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([calendar_event_entity_1.CalendarEvent, job_entity_1.Job, user_entity_1.User])],
        providers: [calendar_service_1.CalendarService, calendar_resolver_1.CalendarResolver],
        exports: [calendar_service_1.CalendarService],
    })
], CalendarModule);
//# sourceMappingURL=calendar.module.js.map