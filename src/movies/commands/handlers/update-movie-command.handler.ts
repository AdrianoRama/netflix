import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { UpdateMovieCommand } from '../impl/update-movie.command';

@CommandHandler(UpdateMovieCommand)
export class UpdateMovieCommandHandler
  implements ICommandHandler<UpdateMovieCommand>
{
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async execute(command: UpdateMovieCommand): Promise<any> {
    return this.moviesRepository.update(command.id, command.updateMovieDto);
  }
}
