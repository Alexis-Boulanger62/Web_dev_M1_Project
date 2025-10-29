import type { ClientId } from '../clients/client.entity';
import type { BookId } from '../books/entities/book.entity';

export type SaleModel = {
  id: string;
  purchaseDate: Date;
  clientId: ClientId;
  bookId: BookId;
};

export type CreateSaleModel = {
  purchaseDate: Date;
  clientId: ClientId;
  bookId: BookId;
};
