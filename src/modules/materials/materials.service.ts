import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Material } from '../../entities/material.entity';
import { MaterialUsage } from '../../entities/material-usage.entity';
import { PurchaseOrder } from '../../entities/purchase-order.entity';
import { PurchaseOrderStatus } from '../../common/enums/material.enum';
import { CreateMaterialInput } from './dto/create-material.input';
import { UpdateMaterialInput } from './dto/update-material.input';
import { FilterMaterialInput } from './dto/filter-material.input';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    @InjectRepository(MaterialUsage)
    private materialUsageRepository: Repository<MaterialUsage>,
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepository: Repository<PurchaseOrder>,
  ) {}

  // Create a new material
  async createMaterial(createMaterialInput: CreateMaterialInput): Promise<Material> {
    try {
      const existingMaterial = await this.materialRepository.findOne({
        where: { materialId: createMaterialInput.materialId },
      });

      if (existingMaterial) {
        throw new BadRequestException('Material ID already exists');
      }

      if (createMaterialInput.stockLevel <= createMaterialInput.minimumStock) {
        createMaterialInput.lowStock = true;
      }

      const newMaterial = this.materialRepository.create(createMaterialInput);
      return this.materialRepository.save(newMaterial);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Find all materials with optional filtering
  async findAll(filter?: FilterMaterialInput): Promise<Material[]> {
    const where: any = {};
    
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
        where.name = Like(`%${filter.searchTerm}%`);
      }
    }

    return this.materialRepository.find({ where });
  }

  // Find materials with low stock
  async findLowStock(): Promise<Material[]> {
    return this.materialRepository.find({
      where: { lowStock: true },
    });
  }

  // Find materials by category
  async findByCategory(category: string): Promise<Material[]> {
    return this.materialRepository.find({
      where: { category: category as any },
    });
  }

  // Find a material by ID
  async findOne(id: string): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { id },
    });
    
    if (!material) {
      throw new NotFoundException('Material not found');
    }
    
    return material;
  }

  // Find a material by material ID
  async findByMaterialId(materialId: string): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { materialId },
    });
    
    if (!material) {
      throw new NotFoundException('Material not found');
    }
    
    return material;
  }

  // Update a material
  async updateMaterial(id: string, updateMaterialInput: UpdateMaterialInput): Promise<Material> {
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
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Update material stock
  async updateStock(id: string, quantity: number): Promise<Material> {
    const material = await this.findOne(id);
    const newStockLevel = material.stockLevel + quantity;
    
    if (newStockLevel < 0) {
      throw new BadRequestException('Insufficient stock');
    }
    
    material.stockLevel = newStockLevel;
    material.lowStock = newStockLevel <= material.minimumStock;
    
    return this.materialRepository.save(material);
  }

  // Record material usage
  async recordUsage(materialId: string, quantity: number, jobId: string, notes?: string): Promise<MaterialUsage> {
    const material = await this.findOne(materialId);
    
    if (material.stockLevel < quantity) {
      throw new BadRequestException('Insufficient stock');
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
  async getMaterialUsageHistory(materialId: string): Promise<MaterialUsage[]> {
    return this.materialUsageRepository.find({
      where: { material: { id: materialId } },
      relations: ['material'],
      order: { usedAt: 'DESC' },
    });
  }

  // Create purchase order
  async createPurchaseOrder(materialId: string, quantity: number, unitPrice: number, notes?: string): Promise<PurchaseOrder> {
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
  async getPurchaseOrders(status?: PurchaseOrderStatus): Promise<PurchaseOrder[]> {
    const where: any = {};
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
  async updatePurchaseOrderStatus(orderId: string, status: PurchaseOrderStatus): Promise<PurchaseOrder> {
    const order = await this.purchaseOrderRepository.findOne({
      where: { id: orderId },
      relations: ['material'],
    });
    
    if (!order) {
      throw new NotFoundException('Purchase order not found');
    }
    
    order.status = status;
    
    if (status === PurchaseOrderStatus.ORDERED) {
      order.orderedAt = new Date();
    } else if (status === PurchaseOrderStatus.RECEIVED) {
      order.receivedAt = new Date();
      // Update stock when order is received
      await this.updateStock(order.material.id, order.quantity);
    }
    
    return this.purchaseOrderRepository.save(order);
  }

  // Delete a material
  async deleteMaterial(id: string): Promise<boolean> {
    try {
      const material = await this.findOne(id);
      await this.materialRepository.remove(material);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
