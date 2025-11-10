import { useState } from 'react'
import type {
  AuthorModel,
  CreateAuthorModel,
  UpdateAuthorModel,
} from '../authormodel'
import type { AuthorDetailModel } from '../AuthorDetailModel'
import axios from 'axios'
import type { BookModel } from '../../books/BookModel'

export const useAuthorProvider = () => {
  const [authors, setAuthors] = useState<AuthorModel[]>([])

  const loadAuthors = () => {
    axios
      .get<AuthorModel[]>('http://localhost:3000/authors')
      .then(res => {
        setAuthors(res.data)
      })
      .catch(err => console.error(err))
  }

  const createAuthor = (author: CreateAuthorModel) => {
    axios
      .post('http://localhost:3000/authors', author)
      .then(() => loadAuthors())
      .catch(err => console.error(err))
  }

  const updateAuthor = (id: string, input: UpdateAuthorModel) => {
    axios
      .patch(`http://localhost:3000/authors/${id}`, input)
      .then(() => loadAuthors())
      .catch(err => console.error(err))
  }

  const deleteAuthor = (id: string) => {
    axios
      .delete(`http://localhost:3000/authors/${id}`)
      .then(() => loadAuthors())
      .catch(err => console.error(err))
  }

  return { authors, loadAuthors, createAuthor, updateAuthor, deleteAuthor }
}

export const useAuthorDetailProvider = (authorId: string) => {
  const [author, setAuthor] = useState<AuthorDetailModel | null>(null)

  const loadAuthor = () => {
    Promise.all([
      axios.get(`http://localhost:3000/authors/${authorId}`),
      axios.get(`http://localhost:3000/books`),
    ])
      .then(([authorRes, booksRes]) => {
        const authorData: AuthorModel = authorRes.data
        const allBooks: BookModel[] = Array.isArray(booksRes.data)
          ? booksRes.data
          : []

        console.log('Author data:', authorData)
        console.log('All books:', allBooks)

        // Filtre les livres de cet auteur
        const authorBooks = allBooks.filter(b => {
          const bookAuthorId = b.author?.id
          console.log(
            `Book ${b.title}: authorId =`,
            bookAuthorId,
            'searching for',
            authorId,
          )
          return bookAuthorId === authorId
        })

        console.log('Filtered books for author:', authorBooks)

        const averageSales =
          authorBooks.length > 0
            ? authorBooks.reduce(
                (sum, b) => sum + (Number(b.salesCount) || 0),
                0,
              ) / authorBooks.length
            : 0

        setAuthor({
          ...authorData,
          books: authorBooks,
          averageSales,
          bookCount: authorBooks.length,
        })
      })
      .catch(err => {
        console.error('Error loading author detail:', err)
        setAuthor(null)
      })
  }

  const updateAuthor = (input: UpdateAuthorModel) => {
    axios
      .patch(`http://localhost:3000/authors/${authorId}`, input)
      .then(() => loadAuthor())
      .catch(err => console.error(err))
  }

  return { author, loadAuthor, updateAuthor }
}
