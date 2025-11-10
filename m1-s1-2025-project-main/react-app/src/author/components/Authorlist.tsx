import { useEffect } from 'react'
import { useAuthorProvider } from '../providers/authorprovider'
import { AuthorListItem } from './AuthorListItem.tsx'
import { CreateAuthorModal } from './CreateAuthorModal'

export function Authorlist() {
  const { authors, loadAuthors, deleteAuthor, updateAuthor, createAuthor } =
    useAuthorProvider()

  useEffect(() => {
    loadAuthors()
  }, [])

  return (
    <>
      <CreateAuthorModal onCreate={createAuthor} />
      <div style={{ padding: '0 .5rem' }}>
        {authors.map(author => (
          <AuthorListItem
            key={author.id}
            author={author}
            onDelete={deleteAuthor}
            onUpdate={updateAuthor}
          />
        ))}
      </div>
    </>
  )
}
