import { useEffect } from 'react'
import { useClientProvider } from '../providers/useClientProvider'
import { ClientListItem } from './ClientListItem'
import { CreateClientModal } from './CreateClientModal'

export function ClientList() {
  const { clients, loadClients, deleteClient, updateClient, createClient } =
    useClientProvider()

  useEffect(() => {
    loadClients()
  }, [])

  return (
    <>
      <CreateClientModal onCreate={createClient} />
      <div style={{ padding: '0 .5rem' }}>
        {clients.map(client => (
          <ClientListItem
            key={client.id}
            client={client}
            onDelete={deleteClient}
            onUpdate={updateClient}
          />
        ))}
      </div>
    </>
  )
}
