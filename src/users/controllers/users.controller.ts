import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { DeleteUserCommand } from '../commands/impl/delete-user.command';
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

  @Put()
  @UseGuards(JwtGuard)
  updateOne(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.commandBus.execute(
      new UpdateCommand(req.user._id, updateUserDto),
    );
  }

  @Delete()
  @UseGuards(JwtGuard)
  deleteOne(@Req() req: any) {
    return this.commandBus.execute(new DeleteUserCommand(req.user._id));
  }
}
