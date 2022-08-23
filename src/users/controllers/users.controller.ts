import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateCommand } from '../commands/impl/update.command';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { GetUserQuery } from '../queries/impl/get-user.query';
import { GetUsersQuery } from '../queries/impl/get-users.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  getAll() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.commandBus.execute(new UpdateCommand(id, updateUserDto));
  }
}
