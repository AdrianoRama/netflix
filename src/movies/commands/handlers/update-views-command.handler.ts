import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { WatchMovieEvent } from 'src/users/events/impl/watch-movie.event';
import { UpdateViewsCommand } from '../impl/update-views.command';

@CommandHandler(UpdateViewsCommand)
export class UpdateViewsCommandHandler
  implements ICommandHandler<UpdateViewsCommand>
{
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateViewsCommand): Promise<any> {
    this.eventBus.publish(
      new WatchMovieEvent(command.userId, command.id, command.title),
    );
    return this.moviesRepository.updateViews(command.id);
  }
}
