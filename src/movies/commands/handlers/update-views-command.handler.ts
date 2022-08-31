import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { UpdateViewsCommand } from '../impl/update-views.command';

@CommandHandler(UpdateViewsCommand)
export class UpdateViewsCommandHandler
  implements ICommandHandler<UpdateViewsCommand>
{
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async execute(command: UpdateViewsCommand): Promise<any> {
    return this.moviesRepository.updateViews(command.id);
  }
}
