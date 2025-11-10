import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorEntity } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorId } from './author.entity';
import { BookEntity } from '../books/entities/book.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    const authors = await this.authorRepository.find();
    const authorsWithCount = await Promise.all(
      authors.map(async (author) => {
        const count = await this.bookRepository.count({
          where: { author: { id: author.id } },
        });
        return { ...author, bookCount: count };
      }),
    );

    return authorsWithCount;
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }
  public async findOne(id: string): Promise<AuthorModel | null> {
    const authorId: AuthorId = id as AuthorId;
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
      relations: ['books'],
    });

    if (!author) return null;
    return { ...author, bookCount: author.books?.length || 0 };
  }
}
