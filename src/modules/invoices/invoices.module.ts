import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { InvoicesResolver } from './invoices.resolver';
import { Invoice } from '../../entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  providers: [InvoicesService, InvoicesResolver],
  exports: [InvoicesService],
})
export class InvoicesModule {}
