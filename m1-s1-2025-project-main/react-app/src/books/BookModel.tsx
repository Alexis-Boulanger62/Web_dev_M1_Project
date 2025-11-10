export type BookModel = {
  id: string
  title: string
  yearPublished: number
  author: {
    id: string
    firstName: string
    lastName: string
  }
  salesCount?: number // <-- ajouté, nombre de ventes (optionnel)
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  salesCount?: number // <-- possibilité de fournir au create
}

export type UpdateBookModel = Partial<CreateBookModel>
