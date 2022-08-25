import { IsNotEmpty, IsOptional } from 'class-validator';
import { ContentRating, MediaType } from '../models/movie.entity';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  genres: string[];

  @IsNotEmpty()
  released: Date;

  @IsNotEmpty()
  directedBy: string;

  @IsNotEmpty()
  cast: string[];

  @IsNotEmpty()
  poster: string;

  @IsNotEmpty()
  userRatings: number[];

  @IsNotEmpty()
  contentRating: ContentRating;

  @IsNotEmpty()
  type: MediaType;

  @IsNotEmpty()
  trailers: string[];

  @IsOptional()
  duration: number;

  @IsNotEmpty()
  url: string;
}
