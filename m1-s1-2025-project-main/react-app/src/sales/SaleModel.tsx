export type CreateSaleModel = {
  clientId: string
  bookId: string
  purchaseDate: string
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
  client: {
    id: string
    firstName: string
    name: string
  }
}
