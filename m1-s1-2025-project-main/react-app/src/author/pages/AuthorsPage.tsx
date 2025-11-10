import { Outlet } from '@tanstack/react-router'
import { Authorlist } from '../components/Authorlist.tsx'

export function AuthorsPage() {
  return (
    <div>
      <Authorlist />
      <Outlet />
    </div>
  )
}