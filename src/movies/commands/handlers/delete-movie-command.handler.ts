import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { DeleteMovieCommand } from '../impl/delete-movie.command';

@CommandHandler(DeleteMovieCommand)
export class DeleteMovieCommandHandler
  implements ICommandHandler<DeleteMovieCommand>
{
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async execute(command: DeleteMovieCommand): Promise<any> {
    return this.moviesRepository.delete(command.id);
  }
}
