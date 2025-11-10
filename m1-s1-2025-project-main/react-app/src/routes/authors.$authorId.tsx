import { createFileRoute } from '@tanstack/react-router'
import { AuthorDetail } from '../author/components/AuthorDetail'

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailPageRoute,
})

function AuthorDetailPageRoute() {
  const { authorId } = Route.useParams()

  return <AuthorDetail id={authorId} />
}