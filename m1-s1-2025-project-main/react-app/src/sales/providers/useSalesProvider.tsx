import { useState } from 'react'
import axios from 'axios'
import type { CreateSaleModel, SaleModel } from '../SaleModel.tsx'

export const useSalesProvider = () => {
  const [sales, setSales] = useState<SaleModel[]>([])

  const loadSales = async () => {
    const { data } = await axios.get('http://localhost:3000/sales')
    setSales(data)
  }

  const createSale = async (sale: CreateSaleModel) => {
    await axios.post('http://localhost:3000/sales', sale)
  }

  const deleteSale = async (id: string) => {
    await axios.delete(`http://localhost:3000/sales/${id}`)
  }

  return { sales, loadSales, createSale, deleteSale }
}
