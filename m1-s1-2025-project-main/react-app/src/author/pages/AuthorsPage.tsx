import { Outlet } from '@tanstack/react-router'
import { AuthorList } from '../components/authorlist'

export function AuthorsPage() {
  return (
    <div>
      <AuthorList />
      <Outlet />
    </div>
  )
}