import { IsInt, Max, Min } from 'class-validator';

export class RateMovieDto {
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
}
