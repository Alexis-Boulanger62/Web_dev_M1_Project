import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SaleEntity } from '../sales/sale.entity';

export type ClientId = string & { __brand: 'Client' };

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ClientId;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email?: string;

  @Column({ name: 'photo_url', type: 'varchar', nullable: true })
  photoUrl?: string;

  @OneToMany(() => SaleEntity, (sale) => sale.client)
  sales: SaleEntity[];
  bookCount: number;
}
