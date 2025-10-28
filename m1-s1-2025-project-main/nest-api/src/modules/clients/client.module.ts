import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { SaleEntity } from '../sales/sale.entity';
import { BookEntity } from '../books/entities/book.entity';
import { AuthorEntity } from '../authors/author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      SaleEntity,
      BookEntity,
      AuthorEntity,
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientRepository, ClientService],
})
export class ClientModule {}
