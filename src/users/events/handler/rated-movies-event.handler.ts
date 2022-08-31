import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { RatedMovieEvent } from '../impl/rated-movies.event';

@EventsHandler(RatedMovieEvent)
export class RatedMoviesEventHandler implements IEventHandler<RatedMovieEvent> {
  constructor(private readonly usersRepository: UsersRepository) {}

  handle(event: RatedMovieEvent) {
    return this.usersRepository.userRatedMovie(
      event.userId,
      event.id,
      event.rating,
    );
  }
}
