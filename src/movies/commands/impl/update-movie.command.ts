import { UpdateMovieDto } from 'src/movies/dtos/update-movie.dto';

export class UpdateMovieCommand {
  constructor(
    public readonly id: string,
    public readonly updateMovieDto: UpdateMovieDto,
  ) {}
}
