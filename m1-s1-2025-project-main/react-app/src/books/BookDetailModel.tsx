import type { SaleModel } from '../sales/SaleModel.tsx'

export type BookDetailModel = {
  id: string
  title: string
  yearPublished: number
  author: {
    id: string
    firstName: string
    lastName: string
  }
  salesCount?: number
  sales: SaleModel[]
}
