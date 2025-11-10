export type AuthorModel = {
  id: string
  firstName: string
  lastName: string
  photoUrl?: string | null
  bookCount: number
}

export type CreateAuthorModel = {
  firstName: string
  lastName: string
  photoUrl?: string | null
}

export type UpdateAuthorModel = Partial<CreateAuthorModel>
