import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import type { AuthorModel, UpdateAuthorModel } from '../authormodel'

interface AuthorListItemProps {
  author: AuthorModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateAuthorModel) => void
}

export function AuthorListItem({ author, onDelete }: AuthorListItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(author.id)
    setIsDeleting(false)
  }

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: 12, 
      borderRadius: 6, 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: 8
    }}>
      <Link to="/authors/$authorId" params={{ authorId: author.id }} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
        <div>
          <strong>{author.firstName} {author.lastName}</strong>
          <div style={{ fontSize: 13, color: '#666' }}>{author.booksCount ?? 0} livre(s)</div>
        </div>
      </Link>
      <Popconfirm title="Supprimer l'auteur ?" onConfirm={handleDelete} okText="Oui" cancelText="Non">
        <Button danger icon={<DeleteOutlined />} loading={isDeleting} />
      </Popconfirm>
    </div>
  )
}