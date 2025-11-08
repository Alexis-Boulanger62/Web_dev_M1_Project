import { createFileRoute } from '@tanstack/react-router'
import { AuthorDetailPage } from '../../author/pages/AuthorDetailPage'

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailPage,
})
