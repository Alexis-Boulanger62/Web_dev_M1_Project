import { createFileRoute } from '@tanstack/react-router'
import { ClientDetail } from '../clients/components/ClientDetail.tsx'

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetailPage,
})

export function ClientDetailPage() {
  const { clientId } = Route.useParams()

  return <ClientDetail id={clientId} />
}
