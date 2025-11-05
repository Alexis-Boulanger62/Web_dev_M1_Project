export type ClientDetailModel = {
  id: string
  name: string
  firstName: string
  email?: string
  photoUrl?: string
  sales: SaleModel[]
}

export type SaleModel = {
  id: string
  purchaseDate: string
  book: {
    id: string
    title: string
    author: {
      firstName: string
      lastName: string
    }
  }
}

export type UpdateClientModel = {
  name?: string
  firstName?: string
  email?: string
  photoUrl?: string
}
