import { CreateMovieDto } from 'src/movies/dtos/create-movie.dto';

export class CreateMovieCommand {
  constructor(public readonly createMovieDto: CreateMovieDto) {}
}
