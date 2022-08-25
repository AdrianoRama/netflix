import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CreateMovieCommandHandler } from './commands/handlers/create-movie-command.handler';
import { DeleteMovieCommandHandler } from './commands/handlers/delete-movie-command.handler';
import { UpdateMovieCommandHandler } from './commands/handlers/update-movie-command.handler';
import { MoviesController } from './controllers/movies.controller';
import { Movie, MovieSchema } from './models/movie.entity';
import { GetAllQueryHandler } from './queries/handlers/get-all-query.handler';
import { GetOneQueryHandler } from './queries/handlers/get-one-query.handler';
import { MoviesRepository } from './repositories/movies.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    CqrsModule,
    AuthModule,
  ],
  controllers: [MoviesController],
  providers: [
    CreateMovieCommandHandler,
    MoviesRepository,
    DeleteMovieCommandHandler,
    GetAllQueryHandler,
    GetOneQueryHandler,
    UpdateMovieCommandHandler,
  ],
})
export class MoviesModule {}
