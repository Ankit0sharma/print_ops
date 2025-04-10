import { registerEnumType } from '@nestjs/graphql';

export enum CustomerType {
  CORPORATE = 'corporate',
  SMALL_BUSINESS = 'small_business',
  INDIVIDUAL = 'individual',
  NON_PROFIT = 'non_profit'
}

export enum CustomerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  BLOCKED = 'blocked'
}

registerEnumType(CustomerType, {
  name: 'CustomerType',
  description: 'Customer type categories'
});

registerEnumType(CustomerStatus, {
  name: 'CustomerStatus',
  description: 'Customer status options'
});

export const transformCustomerType = (type: string): string => {
  const normalizedType = type.toLowerCase();
  if (Object.values(CustomerType).includes(normalizedType as CustomerType)) {
    return normalizedType;
  }
  throw new Error(`Invalid customer type: ${type}`);
};
