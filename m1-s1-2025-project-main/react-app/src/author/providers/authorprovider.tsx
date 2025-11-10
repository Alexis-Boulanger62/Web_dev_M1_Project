import { useState } from 'react'
import type {
  AuthorModel,
  CreateAuthorModel,
  UpdateAuthorModel,
} from '../authormodel'
import type { AuthorDetailModel } from '../AuthorDetailModel'
import axios from 'axios'

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
    axios
      .get(`http://localhost:3000/authors/${authorId}`)
      .then(res => {
        setAuthor(res.data)
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
