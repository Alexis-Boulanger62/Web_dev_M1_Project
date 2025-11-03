import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './client.dto';
import { CreateClientModel, UpdateClientModel } from './client.model';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  public async getAllClients() {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  public async getClientById(@Param('id') id: string) {
    return this.clientService.getClientById(id);
  }

  @Post()
  public async createClient(@Body() body: CreateClientDto) {
    const model: CreateClientModel = body;
    return this.clientService.createClient(model);
  }

  @Patch(':id')
  public async updateClient(
    @Param('id') id: string,
    @Body() body: UpdateClientDto,
  ) {
    const model: UpdateClientModel = body;
    return this.clientService.updateClient(id, model);
  }

  @Delete(':id')
  public async deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(id);
  }
}
