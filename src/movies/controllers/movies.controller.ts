import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMovieCommand } from '../commands/impl/create-movie.command';
import { DeleteMovieCommand } from '../commands/impl/delete-movie.command';
import { UpdateMovieCommand } from '../commands/impl/update-movie.command';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { GetAllQuery } from '../queries/impl/get-all.query';
import { GetOneQuery } from '../queries/impl/get-one.query';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/create')
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.commandBus.execute(new CreateMovieCommand(createMovieDto));
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    this.commandBus.execute(new DeleteMovieCommand(id));
  }

  @Get()
  getAll(@Query('page') page: string) {
    return this.queryBus.execute(new GetAllQuery(+page));
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetOneQuery(id));
  }

  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.commandBus.execute(new UpdateMovieCommand(id, updateMovieDto));
  }
}
