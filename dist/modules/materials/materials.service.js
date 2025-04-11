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
const material_usage_entity_1 = require("../../entities/material-usage.entity");
const purchase_order_entity_1 = require("../../entities/purchase-order.entity");
const material_enum_1 = require("../../common/enums/material.enum");
let MaterialService = class MaterialService {
    constructor(materialRepository, materialUsageRepository, purchaseOrderRepository) {
        this.materialRepository = materialRepository;
        this.materialUsageRepository = materialUsageRepository;
        this.purchaseOrderRepository = purchaseOrderRepository;
    }
    // Create a new material
    async createMaterial(createMaterialInput) {
        try {
            const existingMaterial = await this.materialRepository.findOne({
                where: { materialId: createMaterialInput.materialId },
            });
            if (existingMaterial) {
                throw new common_1.BadRequestException('Material ID already exists');
            }
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
    // Find all materials with optional filtering
    async findAll(filter) {
        const where = {};
        if (filter) {
            if (filter.category) {
                where.category = filter.category;
            }
            if (filter.lowStockOnly) {
                where.lowStock = true;
            }
            if (filter.supplier) {
                where.supplier = filter.supplier;
            }
            if (filter.searchTerm) {
                where.name = (0, typeorm_2.Like)(`%${filter.searchTerm}%`);
            }
        }
        return this.materialRepository.find({ where });
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
    // Update material stock
    async updateStock(id, quantity) {
        const material = await this.findOne(id);
        const newStockLevel = material.stockLevel + quantity;
        if (newStockLevel < 0) {
            throw new common_1.BadRequestException('Insufficient stock');
        }
        material.stockLevel = newStockLevel;
        material.lowStock = newStockLevel <= material.minimumStock;
        return this.materialRepository.save(material);
    }
    // Record material usage
    async recordUsage(materialId, quantity, jobId, notes) {
        const material = await this.findOne(materialId);
        if (material.stockLevel < quantity) {
            throw new common_1.BadRequestException('Insufficient stock');
        }
        const usage = this.materialUsageRepository.create({
            material,
            quantity,
            jobId,
            notes,
        });
        await this.updateStock(materialId, -quantity);
        return this.materialUsageRepository.save(usage);
    }
    // Get material usage history
    async getMaterialUsageHistory(materialId) {
        return this.materialUsageRepository.find({
            where: { material: { id: materialId } },
            relations: ['material'],
            order: { usedAt: 'DESC' },
        });
    }
    // Create purchase order
    async createPurchaseOrder(materialId, quantity, unitPrice, notes) {
        const material = await this.findOne(materialId);
        const order = this.purchaseOrderRepository.create({
            material,
            quantity,
            unitPrice,
            totalPrice: quantity * unitPrice,
            notes,
        });
        return this.purchaseOrderRepository.save(order);
    }
    // Get purchase orders
    async getPurchaseOrders(status) {
        const where = {};
        if (status) {
            where.status = status;
        }
        return this.purchaseOrderRepository.find({
            where,
            relations: ['material'],
            order: { createdAt: 'DESC' },
        });
    }
    // Update purchase order status
    async updatePurchaseOrderStatus(orderId, status) {
        const order = await this.purchaseOrderRepository.findOne({
            where: { id: orderId },
            relations: ['material'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Purchase order not found');
        }
        order.status = status;
        if (status === material_enum_1.PurchaseOrderStatus.ORDERED) {
            order.orderedAt = new Date();
        }
        else if (status === material_enum_1.PurchaseOrderStatus.RECEIVED) {
            order.receivedAt = new Date();
            // Update stock when order is received
            await this.updateStock(order.material.id, order.quantity);
        }
        return this.purchaseOrderRepository.save(order);
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
    __param(1, (0, typeorm_1.InjectRepository)(material_usage_entity_1.MaterialUsage)),
    __param(2, (0, typeorm_1.InjectRepository)(purchase_order_entity_1.PurchaseOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MaterialService);
//# sourceMappingURL=materials.service.js.map