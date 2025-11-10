import { Outlet } from '@tanstack/react-router'
import { AuthorDetail } from '../components/AuthorDetail'

export function AuthorDetailPage() {
  return (
    <div>
      <AuthorDetail />
      <Outlet />
    </div>
  )
}