import { IsOptional } from 'class-validator';
import { ContentRating, MediaType } from '../models/movie.entity';

export class UpdateMovieDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  genres: string[];

  @IsOptional()
  released: Date;

  @IsOptional()
  directedBy: string;

  @IsOptional()
  cast: string[];

  @IsOptional()
  poster: string;

  @IsOptional()
  userRatings: number[];

  @IsOptional()
  contentRating: ContentRating;

  @IsOptional()
  type: MediaType;

  @IsOptional()
  trailers: string[];

  @IsOptional()
  duration: number;

  @IsOptional()
  url: string;
}
