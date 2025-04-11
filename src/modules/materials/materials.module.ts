import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialService } from './materials.service';
import { MaterialResolver } from './materials.resolver';
import { Material } from '../../entities/material.entity';
import { MaterialUsage } from '../../entities/material-usage.entity';
import { PurchaseOrder } from '../../entities/purchase-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Material, MaterialUsage, PurchaseOrder])
  ],
  providers: [MaterialService, MaterialResolver],
  exports: [MaterialService]
})
export class MaterialModule {}
