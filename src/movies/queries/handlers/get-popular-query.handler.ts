import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { GetPopularQuery } from '../impl/get-popular.query';

@QueryHandler(GetPopularQuery)
export class GetPopularQueryHandler implements IQueryHandler<GetPopularQuery> {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async execute(query: GetPopularQuery): Promise<any> {
    return this.moviesRepository.getPopular(query.page);
  }
}
