import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { InvoicesResolver } from './invoices.resolver';
import { Invoice } from '../../entities/invoice.entity';
import { Customer } from '../../entities/customer.entity';
import { Job } from '../../entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Customer, Job])],
  providers: [InvoicesService, InvoicesResolver],
  exports: [InvoicesService],
})
export class InvoicesModule {}
