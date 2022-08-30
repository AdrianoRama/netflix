import { RateMovieDto } from 'src/movies/dtos/rate-movie.dto';

export class RateMovieCommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly title: string,
    public readonly rateMovieDto: RateMovieDto,
  ) {}
}
