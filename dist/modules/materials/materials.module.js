"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const materials_service_1 = require("./materials.service");
const materials_resolver_1 = require("./materials.resolver");
const material_entity_1 = require("../../entities/material.entity");
let MaterialModule = class MaterialModule {
};
exports.MaterialModule = MaterialModule;
exports.MaterialModule = MaterialModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([material_entity_1.Material])],
        providers: [materials_service_1.MaterialService, materials_resolver_1.MaterialResolver],
        exports: [materials_service_1.MaterialService],
    })
], MaterialModule);
//# sourceMappingURL=materials.module.js.map