import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { CreateSaleModel, SaleModel } from './sale.model';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  public async getAllSales(): Promise<SaleModel[]> {
    return this.saleRepository.find({ relations: ['client', 'book'] });
  }

  public async createSale(sale: CreateSaleModel): Promise<SaleModel> {
    return this.saleRepository.save(this.saleRepository.create(sale));
  }

  public async deleteSale(id: string): Promise<void> {
    await this.saleRepository.delete(id);
  }
}
