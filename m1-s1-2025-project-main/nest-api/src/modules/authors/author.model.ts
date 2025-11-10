import { AuthorId } from './author.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  bookCount?: number;
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
};
