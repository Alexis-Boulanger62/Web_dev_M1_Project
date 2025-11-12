import type { SaleModel } from '../sales/SaleModel.tsx'

export type ClientDetailModel = {
  id: string
  name: string
  firstName: string
  email?: string
  photoUrl?: string
  sales: SaleModel[]
}

export type UpdateClientModel = {
  name?: string
  firstName?: string
  email?: string
  photoUrl?: string
}
