import type { ClientModel } from '../clients/ClientModel.tsx'
import type { BookModel } from '../books/BookModel.tsx'

export type SaleModel = {
  id: string
  purchaseDate: string
  clientId: string
  bookId: string
  client: ClientModel
  book: BookModel
}

export type CreateSaleModel = {
  clientId: string
  bookId: string
  purchaseDate: string
}
