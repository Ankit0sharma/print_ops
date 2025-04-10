"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSortField = exports.JobPriority = exports.JobStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var JobStatus;
(function (JobStatus) {
    JobStatus["DESIGN"] = "Design";
    JobStatus["PRODUCTION"] = "Production";
    JobStatus["PRINT"] = "Print";
    JobStatus["APPROVAL"] = "Approval";
    JobStatus["COMPLETED"] = "Completed";
})(JobStatus || (exports.JobStatus = JobStatus = {}));
var JobPriority;
(function (JobPriority) {
    JobPriority["LOW"] = "Low";
    JobPriority["NORMAL"] = "Normal";
    JobPriority["HIGH"] = "High";
    JobPriority["URGENT"] = "Urgent";
})(JobPriority || (exports.JobPriority = JobPriority = {}));
var JobSortField;
(function (JobSortField) {
    JobSortField["NEWEST"] = "newest";
    JobSortField["OLDEST"] = "oldest";
    JobSortField["DUE_DATE_SOONEST"] = "due_date_soonest";
    JobSortField["DUE_DATE_LATEST"] = "due_date_latest";
    JobSortField["PRIORITY_HIGH_LOW"] = "priority_high_low";
    JobSortField["DEFAULT"] = "default";
})(JobSortField || (exports.JobSortField = JobSortField = {}));
(0, graphql_1.registerEnumType)(JobStatus, {
    name: 'JobStatus',
    description: 'Available job statuses'
});
(0, graphql_1.registerEnumType)(JobPriority, {
    name: 'JobPriority',
    description: 'Job priority levels'
});
(0, graphql_1.registerEnumType)(JobSortField, {
    name: 'JobSortField',
    description: 'Job sorting options'
});
//# sourceMappingURL=job.enum.js.map