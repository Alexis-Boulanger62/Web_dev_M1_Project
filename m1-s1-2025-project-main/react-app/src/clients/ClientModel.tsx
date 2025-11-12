export type ClientModel = {
  id: string
  name: string
  firstName: string
  email?: string
  photoUrl?: string
  bookCount: number // nombre de livres achetés
}

export type CreateClientModel = {
  name: string
  firstName: string
  email?: string
  photoUrl?: string
}

export type UpdateClientModel = Partial<CreateClientModel>
