import { IsDateString, IsUUID } from 'class-validator';
import type { ClientId } from '../clients/client.entity';
import type { BookId } from '../books/entities/book.entity';

export class CreateSaleDto {
  @IsDateString()
  purchaseDate: Date;

  @IsUUID(4)
  clientId: ClientId;

  @IsUUID(4)
  bookId: BookId;
}
