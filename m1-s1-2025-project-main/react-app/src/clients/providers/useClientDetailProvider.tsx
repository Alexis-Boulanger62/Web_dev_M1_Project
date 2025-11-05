import { useState } from 'react'
import axios from 'axios'
import type { ClientDetailModel, UpdateClientModel } from '../ClientDetailModel'

export const useClientDetailProvider = (clientId: string) => {
  const [client, setClient] = useState<ClientDetailModel | null>(null)

  const loadClient = () => {
    axios
      .get(`http://localhost:3000/clients/${clientId}`)
      .then(res => setClient(res.data))
      .catch(err => console.error(err))
  }

  const updateClient = (input: UpdateClientModel) => {
    axios
      .patch(`http://localhost:3000/clients/${clientId}`, input)
      .then(() => loadClient())
      .catch(err => console.error(err))
  }

  return { client, loadClient, updateClient }
}
