import { createFileRoute } from '@tanstack/react-router'
import { SalePage } from '../../sales/pages/SalePage.tsx'

export const Route = createFileRoute('/sales/')({
  component: SalePage,
})
