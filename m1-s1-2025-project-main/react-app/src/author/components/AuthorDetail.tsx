import { useEffect, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { useAuthorDetailProvider } from '../providers/authorprovider'
import type { UpdateAuthorModel } from '../authormodel'
import { Input, Button } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface AuthorDetailProps {
  id?: string
}

export function AuthorDetail({ id: propId }: AuthorDetailProps) {
  const params = useParams({ strict: false })
  const authorId = propId || (params as any).authorId

  if (!authorId) return <div style={{ color: '#1890ff' }}>ID manquant</div>

  return <AuthorDetailContent id={authorId} />
}

function AuthorDetailContent({ id }: { id: string }) {
  const { author, loadAuthor, updateAuthor } = useAuthorDetailProvider(id)
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(() => {
    loadAuthor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (author) {
      setFirstName(author.firstName)
      setLastName(author.lastName)
      setPhotoUrl(author.photoUrl ?? '')
    }
  }, [author])

  const onCancelEdit = () => {
    setIsEditing(false)
    if (author) {
      setFirstName(author.firstName)
      setLastName(author.lastName)
      setPhotoUrl(author.photoUrl ?? '')
    }
  }

  const onValidateEdit = () => {
    const input: UpdateAuthorModel = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      photoUrl: photoUrl.trim() || undefined,
    }
    updateAuthor(input)
    setIsEditing(false)
  }

  if (!author) return <div style={{ color: '#1890ff' }}>Chargement...</div>

  const books = Array.isArray(author.books) ? author.books : []

  return (
    <div style={{ padding: '1rem', color: '#1890ff' }}>
      <h2>Détail Auteur</h2>

      {isEditing ? (
        <div style={{ maxWidth: 400, display: 'grid', gap: 8 }}>
          <Input
            placeholder="Prénom"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Nom"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            placeholder="URL photo (optionnel)"
            value={photoUrl}
            onChange={e => setPhotoUrl(e.target.value)}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={onValidateEdit}
            />
            <Button icon={<CloseOutlined />} onClick={onCancelEdit} />
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          <strong style={{ fontSize: 18 }}>
            {author.firstName} {author.lastName}
          </strong>

          <div
            style={{
              marginTop: 8,
              padding: 12,
              backgroundColor: '#f5f5f5',
              borderRadius: 4,
              display: 'grid',
              gap: 8,
            }}
          >
            <div style={{ fontSize: 14 }}>
               <strong>Nombre de livres:</strong> {author.booksCount ?? 0}
            </div>
            <div style={{ fontSize: 14 }}>
               <strong>Ventes moyennes par livre:</strong>{' '}
              {author.averageSales.toFixed(2)}
            </div>
            <div style={{ fontSize: 14 }}>
               <strong>Total des ventes:</strong>{' '}
              {books.reduce((sum, b) => sum + (b.salesCount || 0), 0)}
            </div>
          </div>

          {author.photoUrl && (
            <div style={{ marginTop: 12 }}>
              <img
                src={author.photoUrl}
                alt={`${author.firstName} ${author.lastName}`}
                style={{
                  maxWidth: 200,
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              />
            </div>
          )}

          <Button
            type="primary"
            style={{ marginTop: 12 }}
            onClick={() => setIsEditing(true)}
          >
            Éditer
          </Button>
        </div>
      )}

      <h3 style={{ marginTop: 24 }}>Livres publiés</h3>
      {books.length > 0 ? (
        <div style={{ display: 'grid', gap: 8 }}>
          {books.map(b => (
            <div
              key={b.id}
              style={{
                padding: 12,
                border: '1px solid #d9d9d9',
                borderRadius: 4,
                backgroundColor: '#fafafa',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>
                <a
                  href={`/books/${b.id}`}
                  style={{ color: '#1890ff' }}
                >
                  {b.title}
                </a>
              </div>
              <div style={{ fontSize: 13, color: '#1890ff' }}>
                 Publié en {b.yearPublished} •
                 Ventes: <strong>{b.salesCount ?? 0}</strong>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: 12, color: '#1890ff', fontStyle: 'italic' }}>
          Aucun livre publié
        </div>
      )}
    </div>
  )
}
