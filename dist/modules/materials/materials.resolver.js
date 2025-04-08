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
exports.MaterialResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const materials_service_1 = require("./materials.service");
const material_entity_1 = require("../../entities/material.entity");
const create_material_input_1 = require("./dto/create-material.input");
const update_material_input_1 = require("./dto/update-material.input");
let MaterialResolver = class MaterialResolver {
    constructor(materialService) {
        this.materialService = materialService;
    }
    async getAllMaterials() {
        return this.materialService.findAll();
    }
    async getLowStockMaterials() {
        return this.materialService.findLowStock();
    }
    async getMaterialsByCategory(category) {
        return this.materialService.findByCategory(category);
    }
    async getMaterial(id) {
        return this.materialService.findOne(id);
    }
    async getMaterialByMaterialId(materialId) {
        return this.materialService.findByMaterialId(materialId);
    }
    async createMaterial(createMaterialInput) {
        return this.materialService.createMaterial(createMaterialInput);
    }
    async updateMaterial(id, updateMaterialInput) {
        return this.materialService.updateMaterial(id, updateMaterialInput);
    }
    async updateMaterialStock(id, quantity) {
        return this.materialService.updateStock(id, quantity);
    }
    async deleteMaterial(id) {
        return this.materialService.deleteMaterial(id);
    }
};
exports.MaterialResolver = MaterialResolver;
__decorate([
    (0, graphql_1.Query)(() => [material_entity_1.Material]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "getAllMaterials", null);
__decorate([
    (0, graphql_1.Query)(() => [material_entity_1.Material]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "getLowStockMaterials", null);
__decorate([
    (0, graphql_1.Query)(() => [material_entity_1.Material]),
    __param(0, (0, graphql_1.Args)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "getMaterialsByCategory", null);
__decorate([
    (0, graphql_1.Query)(() => material_entity_1.Material),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "getMaterial", null);
__decorate([
    (0, graphql_1.Query)(() => material_entity_1.Material),
    __param(0, (0, graphql_1.Args)('materialId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "getMaterialByMaterialId", null);
__decorate([
    (0, graphql_1.Mutation)(() => material_entity_1.Material),
    __param(0, (0, graphql_1.Args)('createMaterialInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_material_input_1.CreateMaterialInput]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "createMaterial", null);
__decorate([
    (0, graphql_1.Mutation)(() => material_entity_1.Material),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateMaterialInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_material_input_1.UpdateMaterialInput]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "updateMaterial", null);
__decorate([
    (0, graphql_1.Mutation)(() => material_entity_1.Material),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('quantity', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "updateMaterialStock", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "deleteMaterial", null);
exports.MaterialResolver = MaterialResolver = __decorate([
    (0, graphql_1.Resolver)(() => material_entity_1.Material),
    __metadata("design:paramtypes", [materials_service_1.MaterialService])
], MaterialResolver);
//# sourceMappingURL=materials.resolver.js.map