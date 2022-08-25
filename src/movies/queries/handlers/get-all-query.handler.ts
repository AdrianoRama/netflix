import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { GetAllQuery } from '../impl/get-all.query';

@QueryHandler(GetAllQuery)
export class GetAllQueryHandler implements IQueryHandler<GetAllQuery> {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async execute(query: GetAllQuery): Promise<any> {
    return this.moviesRepository.getAll(query.page);
  }
}
