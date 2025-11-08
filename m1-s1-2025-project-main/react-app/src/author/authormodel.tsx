export type AuthorModel = {
  id: string;
  name: string;
  bio?: string;
  booksCount: number;
};

export type CreateAuthorModel = {
  name: string;
  bio?: string;
};

export type UpdateAuthorModel = Partial<CreateAuthorModel>;