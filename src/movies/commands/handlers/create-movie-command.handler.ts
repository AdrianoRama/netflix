import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { CreateMovieCommand } from '../impl/create-movie.command';

@CommandHandler(CreateMovieCommand)
export class CreateMovieCommandHandler
  implements ICommandHandler<CreateMovieCommand>
{
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async execute(command: CreateMovieCommand): Promise<any> {
    return this.moviesRepository.create(command.createMovieDto);
  }
}
