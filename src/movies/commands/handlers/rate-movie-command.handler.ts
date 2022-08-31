import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { MoviesRepository } from 'src/movies/repositories/movies.repository';
import { RatedMovieEvent } from 'src/users/events/impl/rated-movies.event';
import { RateMovieCommand } from '../impl/rate-movie.command';

@CommandHandler(RateMovieCommand)
export class RateMovieCommandHandler
  implements ICommandHandler<RateMovieCommand>
{
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RateMovieCommand): Promise<any> {
    this.eventBus.publish(
      new RatedMovieEvent(
        command.userId,
        command.id,
        command.rateMovieDto.rating,
      ),
    );
    return this.moviesRepository.rateMovie(
      command.userId,
      command.id,
      command.rateMovieDto,
    );
  }
}
