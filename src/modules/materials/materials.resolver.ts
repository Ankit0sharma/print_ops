import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { MaterialService } from './materials.service';
import { Material } from '../../entities/material.entity';
import { MaterialUsage } from '../../entities/material-usage.entity';
import { PurchaseOrder } from '../../entities/purchase-order.entity';
import { PurchaseOrderStatus } from '../../common/enums/material.enum';
import { CreateMaterialInput } from './dto/create-material.input';
import { UpdateMaterialInput } from './dto/update-material.input';
import { FilterMaterialInput } from './dto/filter-material.input';

@Resolver(() => Material)
export class MaterialResolver {
  constructor(private readonly materialService: MaterialService) {}

  @Query(() => [Material])
  async getAllMaterials(
    @Args('filter', { nullable: true }) filter?: FilterMaterialInput
  ): Promise<Material[]> {
    return this.materialService.findAll(filter);
  }

  @Query(() => [Material])
  async getLowStockMaterials(): Promise<Material[]> {
    return this.materialService.findLowStock();
  }

  @Query(() => [Material])
  async getMaterialsByCategory(@Args('category') category: string): Promise<Material[]> {
    return this.materialService.findByCategory(category);
  }

  @Query(() => Material)
  async getMaterial(@Args('id') id: string): Promise<Material> {
    return this.materialService.findOne(id);
  }

  @Query(() => Material)
  async getMaterialByMaterialId(@Args('materialId') materialId: string): Promise<Material> {
    return this.materialService.findByMaterialId(materialId);
  }

  @Query(() => [MaterialUsage])
  async getMaterialUsageHistory(@Args('materialId') materialId: string): Promise<MaterialUsage[]> {
    return this.materialService.getMaterialUsageHistory(materialId);
  }

  @Query(() => [PurchaseOrder])
  async getPurchaseOrders(
    @Args('status', { nullable: true }) status?: PurchaseOrderStatus
  ): Promise<PurchaseOrder[]> {
    return this.materialService.getPurchaseOrders(status);
  }

  @Mutation(() => Material)
  async createMaterial(
    @Args('createMaterialInput') createMaterialInput: CreateMaterialInput,
  ): Promise<Material> {
    return this.materialService.createMaterial(createMaterialInput);
  }

  @Mutation(() => Material)
  async updateMaterial(
    @Args('id') id: string,
    @Args('updateMaterialInput') updateMaterialInput: UpdateMaterialInput,
  ): Promise<Material> {
    return this.materialService.updateMaterial(id, updateMaterialInput);
  }

  @Mutation(() => Material)
  async updateMaterialStock(
    @Args('id') id: string,
    @Args('quantity', { type: () => Int }) quantity: number,
  ): Promise<Material> {
    return this.materialService.updateStock(id, quantity);
  }

  @Mutation(() => MaterialUsage)
  async recordMaterialUsage(
    @Args('materialId') materialId: string,
    @Args('quantity', { type: () => Int }) quantity: number,
    @Args('jobId') jobId: string,
    @Args('notes', { nullable: true }) notes?: string,
  ): Promise<MaterialUsage> {
    return this.materialService.recordUsage(materialId, quantity, jobId, notes);
  }

  @Mutation(() => PurchaseOrder)
  async createPurchaseOrder(
    @Args('materialId') materialId: string,
    @Args('quantity', { type: () => Int }) quantity: number,
    @Args('unitPrice', { type: () => Float }) unitPrice: number,
    @Args('notes', { nullable: true }) notes?: string,
  ): Promise<PurchaseOrder> {
    return this.materialService.createPurchaseOrder(materialId, quantity, unitPrice, notes);
  }

  @Mutation(() => PurchaseOrder)
  async updatePurchaseOrderStatus(
    @Args('orderId') orderId: string,
    @Args('status') status: PurchaseOrderStatus,
  ): Promise<PurchaseOrder> {
    return this.materialService.updatePurchaseOrderStatus(orderId, status);
  }

  @Mutation(() => Boolean)
  async deleteMaterial(@Args('id') id: string): Promise<boolean> {
    return this.materialService.deleteMaterial(id);
  }
}
