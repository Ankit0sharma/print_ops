"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepeatType = exports.EventStatus = exports.EventType = void 0;
const graphql_1 = require("@nestjs/graphql");
var EventType;
(function (EventType) {
    EventType["INSTALLATION"] = "installation";
    EventType["MEETING"] = "meeting";
    EventType["DEADLINE"] = "deadline";
    EventType["REMINDER"] = "reminder";
})(EventType || (exports.EventType = EventType = {}));
var EventStatus;
(function (EventStatus) {
    EventStatus["SCHEDULED"] = "scheduled";
    EventStatus["IN_PROGRESS"] = "in_progress";
    EventStatus["COMPLETED"] = "completed";
    EventStatus["CANCELLED"] = "cancelled";
})(EventStatus || (exports.EventStatus = EventStatus = {}));
var EventRepeatType;
(function (EventRepeatType) {
    EventRepeatType["NONE"] = "none";
    EventRepeatType["DAILY"] = "daily";
    EventRepeatType["WEEKLY"] = "weekly";
    EventRepeatType["MONTHLY"] = "monthly";
})(EventRepeatType || (exports.EventRepeatType = EventRepeatType = {}));
(0, graphql_1.registerEnumType)(EventType, {
    name: 'EventType',
    description: 'Types of calendar events',
});
(0, graphql_1.registerEnumType)(EventStatus, {
    name: 'EventStatus',
    description: 'Status of calendar events',
});
(0, graphql_1.registerEnumType)(EventRepeatType, {
    name: 'EventRepeatType',
    description: 'Event repeat frequency',
});
//# sourceMappingURL=calendar.enum.js.map