import type { AuthorModel } from './authormodel'
import type { BookModel } from '../books/BookModel'

export interface AuthorDetailModel extends AuthorModel {
  books: BookModel[]
  averageSales: number
}