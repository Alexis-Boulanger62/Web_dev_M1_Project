import { useState } from 'react'
import { Button, Modal, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { CreateAuthorModel } from '../authormodel'

interface CreateAuthorModelProps {
  onCreate: (payload: CreateAuthorModel) => void
}

export function CreateAuthorModal({ onCreate }: CreateAuthorModelProps) {
  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!firstName.trim() || !lastName.trim()) return
    setLoading(true)
    try {
      await onCreate({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        photoUrl: photoUrl.trim() || undefined,
      })
      setFirstName('')
      setLastName('')
      setPhotoUrl('')
      setOpen(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)} style={{ marginBottom: 16 }}>
        Créer un auteur
      </Button>
      <Modal
        title="Créer un auteur"
        open={open}
        onOk={handleCreate}
        onCancel={() => setOpen(false)}
        confirmLoading={loading}
        okText="Créer"
        cancelText="Annuler"
      >
        <div style={{ display: 'grid', gap: 8 }}>
          <Input placeholder="Prénom" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <Input placeholder="Nom" value={lastName} onChange={e => setLastName(e.target.value)} />
          <Input placeholder="Photo URL (optionnel)" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
        </div>
      </Modal>
    </>
  )
}