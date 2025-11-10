import { Body, Controller, Delete, Get, Post ,Param} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }
  @Get(':id') 
  async findOne(@Param('id') id: string) {
    console.log('GET /authors/:id ->', id);
    return this.authorService.findOne(id);
  }
  @Post()
  public async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.authorService.delete(id);
  }
}
