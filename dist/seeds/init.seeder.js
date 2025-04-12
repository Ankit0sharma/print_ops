"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const role_seeder_1 = __importDefault(require("./role.seeder"));
class InitSeeder {
    async run(dataSource) {
        await (0, typeorm_extension_1.runSeeders)(dataSource, {
            seeds: [
                role_seeder_1.default,
            ],
        });
    }
}
exports.default = InitSeeder;
//# sourceMappingURL=init.seeder.js.map