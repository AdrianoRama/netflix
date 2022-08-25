import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { GetOneQuery } from '../impl/get-one.query';

@QueryHandler(GetOneQuery)
export class GetOneQueryHandler implements IQueryHandler {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async execute(query: any): Promise<any> {
    return this.moviesRepository.getOne(query.id);
  }
}
