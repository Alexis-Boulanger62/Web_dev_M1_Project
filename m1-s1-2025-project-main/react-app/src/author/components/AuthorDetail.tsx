import { useEffect, useState } from 'react'
import { useAuthorDetailProvider } from '../providers/authorprovider'
import type { UpdateAuthorModel } from '../authormodel'
import { Input, Button } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface AuthorDetailProps {
  id?: string 
}

export function AuthorDetail({ id: propId }: AuthorDetailProps) {
  const authorId = propId
  
  if (!authorId) return <div>ID manquant</div>
  
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

  if (!author) return <div>Chargement...</div>

  return (
    <div style={{ padding: '1rem' }}>
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
            <Button type="primary" icon={<CheckOutlined />} onClick={onValidateEdit} />
            <Button icon={<CloseOutlined />} onClick={onCancelEdit} />
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          <strong>
            {author.firstName} {author.lastName}
          </strong>
          <div style={{ fontSize: 13, color: '#666' }}>
            {author.booksCount ?? 0} livre(s) — Ventes moyennes: {author.averageSales.toFixed(2)}
          </div>
          {author.photoUrl && (
            <div style={{ marginTop: 8 }}>
              <img
                src={author.photoUrl}
                alt={`${author.firstName} ${author.lastName}`}
                style={{ maxWidth: 160, borderRadius: 4 }}
              />
            </div>
          )}
          <Button
            type="primary"
            style={{ marginTop: 8 }}
            onClick={() => setIsEditing(true)}
          >
            Éditer
          </Button>
        </div>
      )}

      <h3>Livres publiés</h3>
      <ul style={{ paddingLeft: 16 }}>
        {author.books?.map(b => (
          <li key={b.id}>
            <a href={`/books/${b.id}`}>{b.title}</a> — {b.yearPublished} — ventes: {b.salesCount ?? 0}
          </li>
        ))}
        {(!author.books || author.books.length === 0) && <li>Aucun livre.</li>}
      </ul>
    </div>
  )
}
