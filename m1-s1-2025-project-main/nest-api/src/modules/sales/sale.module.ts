import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { SaleRepository } from './sale.repository';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { ClientEntity } from '../clients/client.entity';
import { BookEntity } from '../books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, ClientEntity, BookEntity])],
  controllers: [SaleController],
  providers: [SaleRepository, SaleService],
  exports: [SaleService],
})
export class SaleModule {}
