import { useEffect, useState } from 'react'
import type { UpdateClientModel } from '../ClientDetailModel'
import { Button, Table, Input } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { useClientDetailProvider } from '../providers/useClientDetailProvider.tsx'

interface ClientDetailProps {
  id: string
}

export function ClientDetail({ id }: ClientDetailProps) {
  const { client, loadClient, updateClient } = useClientDetailProvider(id)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    loadClient()
  }, [])

  useEffect(() => {
    if (client) {
      setName(client.name)
      setFirstName(client.firstName)
      setEmail(client.email ?? '')
    }
  }, [client])

  const onCancelEdit = () => {
    setIsEditing(false)
    if (client) {
      setName(client.name)
      setFirstName(client.firstName)
      setEmail(client.email ?? '')
    }
  }

  const onValidateEdit = () => {
    const input: UpdateClientModel = { name, firstName, email }
    updateClient(input)
    setIsEditing(false)
  }

  if (!client) return <div>Loading...</div>

  return (
    <div>
      <h2>Client Detail</h2>
      {isEditing ? (
        <div style={{ marginBottom: '1rem' }}>
          <Input
            style={{ marginBottom: '.5rem' }}
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            style={{ marginBottom: '.5rem' }}
            placeholder="Last Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div style={{ marginTop: '.5rem' }}>
            <Button
              type="primary"
              onClick={onValidateEdit}
              icon={<CheckOutlined />}
            />
            <Button
              onClick={onCancelEdit}
              icon={<CloseOutlined />}
              style={{ marginLeft: 8 }}
            />
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          <strong>
            {client.firstName} {client.name}
          </strong>{' '}
          ({client.email})
          <Button
            type="primary"
            onClick={() => setIsEditing(true)}
            style={{ marginLeft: 8 }}
          >
            Edit
          </Button>
        </div>
      )}

      <h3>Purchased Books</h3>
      <Table
        dataSource={client.sales}
        rowKey="id"
        pagination={false}
        columns={[
          {
            title: 'Title',
            dataIndex: ['book', 'title'],
            render: (_, record) => (
              <Link to={`/books/$bookId`} params={{ bookId: record.book.id }}>
                {record.book.title}
              </Link>
            ),
          },
          {
            title: 'Author',
            render: (_, record) =>
              `${record.book.author.firstName} ${record.book.author.lastName}`,
          },
          {
            title: 'Purchase Date',
            dataIndex: 'purchaseDate',
          },
        ]}
      />
    </div>
  )
}
