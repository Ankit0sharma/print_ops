import { registerEnumType } from '@nestjs/graphql';

export enum MaterialCategory {
  SUBSTRATE = 'substrate',
  VINYL = 'vinyl',
  ELECTRONICS = 'electronics',
  HARDWARE = 'hardware',
  INK = 'ink',
}

export enum PurchaseOrderStatus {
  PENDING = 'pending',
  ORDERED = 'ordered',
  RECEIVED = 'received',
  CANCELLED = 'cancelled'
}

registerEnumType(MaterialCategory, {
  name: 'MaterialCategory',
  description: 'Material category types',
});

registerEnumType(PurchaseOrderStatus, {
  name: 'PurchaseOrderStatus',
  description: 'Purchase order status types',
});
