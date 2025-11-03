import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity, ClientId } from './client.entity';
import {
  ClientModel,
  CreateClientModel,
  UpdateClientModel,
} from './client.model';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  public async getAllClients(): Promise<ClientModel[]> {
    const clients = await this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.sales', 'sales')
      .loadRelationCountAndMap('client.bookCount', 'client.sales')
      .getMany();

    return clients.map((c) => ({
      id: c.id,
      name: c.name,
      firstName: c.firstName,
      email: c.email,
      photoUrl: c.photoUrl,
      bookCount: c.bookCount ?? 0,
    }));
  }

  public async getClientById(id: string): Promise<ClientEntity | null> {
    return this.clientRepository.findOne({
      where: { id: id as ClientId },
      relations: ['sales', 'sales.book', 'sales.book.author'],
    });
  }

  public async createClient(data: CreateClientModel): Promise<ClientEntity> {
    const client = this.clientRepository.create(data);
    return this.clientRepository.save(client);
  }

  public async updateClient(
    id: string,
    data: UpdateClientModel,
  ): Promise<ClientEntity | null> {
    await this.clientRepository.update(id, data);
    return this.getClientById(id);
  }

  public async deleteClient(id: string): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
