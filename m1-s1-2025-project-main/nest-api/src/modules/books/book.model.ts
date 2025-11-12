import { AuthorId } from '../authors/author.entity';

export type BookAuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
};

export type BookModel = {
  id: string;
  title: string;
  author: BookAuthorModel;
  yearPublished: number;
  salesCount: number;
  
};

export type CreateBookModel = {
  title: string;
  authorId: AuthorId;
  yearPublished: number;
};

export type UpdateBookModel = Partial<CreateBookModel>;

export type FilterBooksModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof BookModel, 'ASC' | 'DESC'>>;
};

export type GetBooksModel = {
  totalCount: number;
  data: BookModel[];
};
