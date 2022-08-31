import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { WatchMovieEvent } from '../impl/watch-movie.event';

@EventsHandler(WatchMovieEvent)
export class WatchMovieEventHandler implements IEventHandler<WatchMovieEvent> {
  constructor(private readonly usersRepository: UsersRepository) {}

  handle(event: WatchMovieEvent) {
    return this.usersRepository.watchMovie(event.userId, event.id, event.title);
  }
}
