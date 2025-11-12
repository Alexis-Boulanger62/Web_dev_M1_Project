export type ClientModel = {
  id: string
  name: string
  firstName: string
  email?: string
  photoUrl?: string
  bookCount: number 
}

export type CreateClientModel = {
  name: string
  firstName: string
  email?: string
  photoUrl?: string
}

export type UpdateClientModel = Partial<CreateClientModel>
