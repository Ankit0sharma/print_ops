import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InvoicesService } from './invoices.service';
import { Invoice } from '../../entities/invoice.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { InvoiceFilterInput } from './dto/invoice-filter.input';
import { InvoicePaginationOutput } from './dto/invoice-pagination.output';
import { InvoiceStatsOutput } from './dto/invoice-stats.output';

@Resolver(() => Invoice)
export class InvoicesResolver {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Query(() => InvoicePaginationOutput)
  async invoices(
    @Args('filterInput', { nullable: true }) filterInput?: InvoiceFilterInput,
  ): Promise<InvoicePaginationOutput> {
    return this.invoicesService.findInvoices(filterInput || {});
  }

  @Query(() => Invoice)
  async invoice(@Args('id') id: string): Promise<Invoice> {
    return this.invoicesService.findInvoice(id);
  }

  @Query(() => InvoiceStatsOutput)
  async stats(): Promise<InvoiceStatsOutput> {
    return this.invoicesService.getStats();
  }

  @Mutation(() => Invoice)
  async createInvoice(
    @Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput,
  ): Promise<Invoice> {
    return this.invoicesService.createInvoice(createInvoiceInput);
  }

  @Mutation(() => Invoice)
  async updateInvoice(
    @Args('id') id: string,
    @Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput,
  ): Promise<Invoice> {
    return this.invoicesService.updateInvoice(id, updateInvoiceInput);
  }

  @Mutation(() => Boolean)
  async deleteInvoice(@Args('id') id: string): Promise<boolean> {
    return this.invoicesService.deleteInvoice(id);
  }
}
