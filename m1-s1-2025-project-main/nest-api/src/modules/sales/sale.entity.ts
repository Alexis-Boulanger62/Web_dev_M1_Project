import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity, type ClientId } from '../clients/client.entity';
import { BookEntity, type BookId } from '../books/entities/book.entity';

export type SaleId = string & { __brand: 'Sale' };

@Entity('sales')
export class SaleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: SaleId;

  @Column({ name: 'purchase_date', type: 'date' })
  purchaseDate: Date;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: ClientId;

  @ManyToOne(() => ClientEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column({ name: 'book_id', type: 'uuid' })
  bookId: BookId;

  @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;
}
