import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { GetLatestQuery } from '../impl/get-latest.query';

@QueryHandler(GetLatestQuery)
export class GetLatestQueryHandler implements IQueryHandler<GetLatestQuery> {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async execute(query: GetLatestQuery): Promise<any> {
    return this.moviesRepository.getLatest(query.page);
  }
}
