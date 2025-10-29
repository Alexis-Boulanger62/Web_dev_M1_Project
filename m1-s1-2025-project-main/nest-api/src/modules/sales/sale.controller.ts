import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './sale.dto';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  public async getAllSales() {
    return this.saleService.getAllSales();
  }

  @Post()
  public async createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.createSale(createSaleDto);
  }

  @Delete(':id')
  public async deleteSale(@Param('id') id: string) {
    return this.saleService.deleteSale(id);
  }
}
