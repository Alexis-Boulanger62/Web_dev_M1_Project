import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import {
  ClientModel,
  CreateClientModel,
  UpdateClientModel,
} from './client.model';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async getAllClients(): Promise<ClientModel[]> {
    return this.clientRepository.getAllClients();
  }

  public async getClientById(id: string) {
    return this.clientRepository.getClientById(id);
  }

  public async createClient(input: CreateClientModel) {
    return this.clientRepository.createClient(input);
  }

  public async updateClient(id: string, input: UpdateClientModel) {
    return this.clientRepository.updateClient(id, input);
  }

  public async deleteClient(id: string): Promise<void> {
    return this.clientRepository.deleteClient(id);
  }
}
