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
exports.CreateEventInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const calendar_enum_1 = require("../../../common/enums/calendar.enum");
let CreateEventInput = class CreateEventInput {
};
exports.CreateEventInput = CreateEventInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => calendar_enum_1.EventType),
    (0, class_validator_1.IsEnum)(calendar_enum_1.EventType),
    __metadata("design:type", String)
], CreateEventInput.prototype, "eventType", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateEventInput.prototype, "startTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateEventInput.prototype, "endTime", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventInput.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)(() => calendar_enum_1.EventRepeatType, { defaultValue: calendar_enum_1.EventRepeatType.NONE }),
    (0, class_validator_1.IsEnum)(calendar_enum_1.EventRepeatType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEventInput.prototype, "repeatType", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateEventInput.prototype, "assignedToId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateEventInput.prototype, "jobId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventInput.prototype, "description", void 0);
exports.CreateEventInput = CreateEventInput = __decorate([
    (0, graphql_1.InputType)()
], CreateEventInput);
//# sourceMappingURL=create-event.input.js.map