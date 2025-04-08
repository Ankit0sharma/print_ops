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
exports.MaterialService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const material_entity_1 = require("../../entities/material.entity");
let MaterialService = class MaterialService {
    constructor(materialRepository) {
        this.materialRepository = materialRepository;
    }
    // Create a new material
    async createMaterial(createMaterialInput) {
        try {
            // Check if material ID already exists
            const existingMaterial = await this.materialRepository.findOne({
                where: { materialId: createMaterialInput.materialId },
            });
            if (existingMaterial) {
                throw new common_1.BadRequestException('Material ID already exists');
            }
            // Automatically set lowStock flag based on stock level
            if (createMaterialInput.stockLevel <= createMaterialInput.minimumStock) {
                createMaterialInput.lowStock = true;
            }
            const newMaterial = this.materialRepository.create(createMaterialInput);
            return this.materialRepository.save(newMaterial);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    // Find all materials
    async findAll() {
        return this.materialRepository.find();
    }
    // Find materials with low stock
    async findLowStock() {
        return this.materialRepository.find({
            where: { lowStock: true },
        });
    }
    // Find materials by category
    async findByCategory(category) {
        return this.materialRepository.find({
            where: { category: category },
        });
    }
    // Find a material by ID
    async findOne(id) {
        const material = await this.materialRepository.findOne({
            where: { id },
        });
        if (!material) {
            throw new common_1.NotFoundException('Material not found');
        }
        return material;
    }
    // Find a material by material ID
    async findByMaterialId(materialId) {
        const material = await this.materialRepository.findOne({
            where: { materialId },
        });
        if (!material) {
            throw new common_1.NotFoundException('Material not found');
        }
        return material;
    }
    // Update a material
    async updateMaterial(id, updateMaterialInput) {
        try {
            const material = await this.findOne(id);
            // If stock level is updated, check if we need to update the lowStock flag
            if (updateMaterialInput.stockLevel !== undefined) {
                const minimumStock = updateMaterialInput.minimumStock !== undefined
                    ? updateMaterialInput.minimumStock
                    : material.minimumStock;
                updateMaterialInput.lowStock = updateMaterialInput.stockLevel <= minimumStock;
            }
            Object.assign(material, updateMaterialInput);
            return this.materialRepository.save(material);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    // Update stock level
    async updateStock(id, quantity) {
        const material = await this.findOne(id);
        // Prevent negative stock
        if (material.stockLevel + quantity < 0) {
            throw new common_1.BadRequestException('Cannot reduce stock below zero');
        }
        material.stockLevel += quantity;
        material.lowStock = material.stockLevel <= material.minimumStock;
        return this.materialRepository.save(material);
    }
    // Delete a material
    async deleteMaterial(id) {
        try {
            const material = await this.findOne(id);
            await this.materialRepository.remove(material);
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.MaterialService = MaterialService;
exports.MaterialService = MaterialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(material_entity_1.Material)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MaterialService);
//# sourceMappingURL=materials.service.js.map