import { ClientId } from './client.entity';

export type ClientModel = {
  id: ClientId;
  name: string;
  firstName: string;
  bookCount: number;
  email?: string;
  photoUrl?: string;
};

export type CreateClientModel = {
  name: string;
  firstName: string;
  email?: string;
  photoUrl?: string;
};

export type UpdateClientModel = Partial<CreateClientModel>;
