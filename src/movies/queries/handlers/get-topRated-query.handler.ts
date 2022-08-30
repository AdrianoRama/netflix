import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { GetTopRatedQuery } from '../impl/get-topRated.query';

@QueryHandler(GetTopRatedQuery)
export class GetTopRatedQueryHandler
  implements IQueryHandler<GetTopRatedQuery>
{
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async execute(query: GetTopRatedQuery): Promise<any> {
    return this.moviesRepository.getTopRated(query.page);
  }
}
