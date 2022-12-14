import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RatedMoviesEventHandler } from 'src/users/events/handler/rated-movies-event.handler';
import { WatchMovieEventHandler } from 'src/users/events/handler/watch-movie-event.handler';
import { User, UserSchema } from 'src/users/models/user.entity';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { UsersModule } from 'src/users/users.module';
import { CreateMovieCommandHandler } from './commands/handlers/create-movie-command.handler';
import { DeleteMovieCommandHandler } from './commands/handlers/delete-movie-command.handler';
import { RateMovieCommandHandler } from './commands/handlers/rate-movie-command.handler';
import { UpdateMovieCommandHandler } from './commands/handlers/update-movie-command.handler';
import { UpdateViewsCommandHandler } from './commands/handlers/update-views-command.handler';
import { MoviesController } from './controllers/movies.controller';
import { Movie, MovieSchema } from './models/movie.entity';
import { GetAllQueryHandler } from './queries/handlers/get-all-query.handler';
import { GetLatestQueryHandler } from './queries/handlers/get-latest-query.handler';
import { GetOneQueryHandler } from './queries/handlers/get-one-query.handler';
import { GetPopularQueryHandler } from './queries/handlers/get-popular-query.handler';
import { GetTopRatedQueryHandler } from './queries/handlers/get-topRated-query.handler';
import { MoviesRepository } from './repositories/movies.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [MoviesController],
  providers: [
    CreateMovieCommandHandler,
    MoviesRepository,
    DeleteMovieCommandHandler,
    GetAllQueryHandler,
    GetOneQueryHandler,
    UpdateMovieCommandHandler,
    RateMovieCommandHandler,
    RatedMoviesEventHandler,
    UsersRepository,
    GetTopRatedQueryHandler,
    GetLatestQueryHandler,
    UpdateViewsCommandHandler,
    WatchMovieEventHandler,
    GetPopularQueryHandler,
  ],
})
export class MoviesModule {}
