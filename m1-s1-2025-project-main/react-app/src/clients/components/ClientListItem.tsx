import { useState } from 'react'
import type { ClientModel, UpdateClientModel } from '../ClientModel'
import { Button, Col, Row, Modal } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface ClientListItemProps {
  client: ClientModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateClientModel) => void
}

export function ClientListItem({
  client,
  onDelete,
  onUpdate,
}: ClientListItemProps) {
  const [name, setName] = useState(client.name)
  const [firstName, setFirstName] = useState(client.firstName)
  const [isEditing, setIsEditing] = useState(false)

  const onCancelEdit = () => {
    setIsEditing(false)
    setName(client.name)
    setFirstName(client.firstName)
  }

  const onValidateEdit = () => {
    onUpdate(client.id, { name, firstName })
    setIsEditing(false)
  }

  const confirmDelete = () => {
    Modal.confirm({
      title: 'Delete Client',
      content: 'Are you sure you want to delete this client?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => onDelete(client.id),
    })
  }

  return (
    <Row
      style={{
        width: '100%',
        height: '50px',
        borderRadius: '10px',
        backgroundColor: '#EEEEEE',
        margin: '1rem 0',
        padding: '.25rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Col span={8} style={{ margin: 'auto 0' }}>
        {isEditing ? (
          <>
            <input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <input value={name} onChange={e => setName(e.target.value)} />
          </>
        ) : (
          <Link to={`/clients/$clientId`} params={{ clientId: client.id }}>
            <span style={{ fontWeight: 'bold' }}>
              {client.firstName} {client.name}
            </span>
          </Link>
        )}
      </Col>
      <Col span={8} style={{ margin: 'auto 0' }}>
        {client.salesCount} books purchased
      </Col>
      <Col
        span={6}
        style={{
          display: 'flex',
          gap: '.25rem',
          justifyContent: 'flex-end',
          margin: 'auto 0',
        }}
      >
        {isEditing ? (
          <>
            <Button type="primary" onClick={onValidateEdit}>
              <CheckOutlined />
            </Button>
            <Button onClick={onCancelEdit}>
              <CloseOutlined />
            </Button>
          </>
        ) : (
          <Button type="primary" onClick={() => setIsEditing(true)}>
            <EditOutlined />
          </Button>
        )}
        <Button type="primary" danger onClick={confirmDelete}>
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  )
}
