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
exports.SortJobInput = exports.JobSortField = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const sort_enum_1 = require("../../../common/enums/sort.enum");
var JobSortField;
(function (JobSortField) {
    JobSortField["CREATED_AT"] = "createdAt";
    JobSortField["UPDATED_AT"] = "updatedAt";
    JobSortField["DUE_DATE"] = "dueDate";
    JobSortField["NAME"] = "name";
    JobSortField["PRIORITY"] = "priority";
    JobSortField["STATUS"] = "status";
})(JobSortField || (exports.JobSortField = JobSortField = {}));
(0, graphql_1.registerEnumType)(JobSortField, {
    name: 'JobSortField',
    description: 'Fields that can be sorted on jobs'
});
let SortJobInput = class SortJobInput {
    constructor() {
        this.field = JobSortField.CREATED_AT;
        this.order = sort_enum_1.SortOrder.DESC;
    }
};
exports.SortJobInput = SortJobInput;
__decorate([
    (0, graphql_1.Field)(() => JobSortField),
    (0, class_validator_1.IsEnum)(JobSortField),
    __metadata("design:type", String)
], SortJobInput.prototype, "field", void 0);
__decorate([
    (0, graphql_1.Field)(() => sort_enum_1.SortOrder),
    (0, class_validator_1.IsEnum)(sort_enum_1.SortOrder),
    __metadata("design:type", String)
], SortJobInput.prototype, "order", void 0);
exports.SortJobInput = SortJobInput = __decorate([
    (0, graphql_1.InputType)()
], SortJobInput);
//# sourceMappingURL=sort-job.input.js.map