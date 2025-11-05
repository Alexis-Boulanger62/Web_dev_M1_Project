import { Outlet } from '@tanstack/react-router'
import { SaleList } from '../components/SaleList.tsx'

export function SalePage() {
  return (
    <div>
      <SaleList />
      <Outlet />
    </div>
  )
}
