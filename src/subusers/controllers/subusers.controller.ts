import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateSubuserCommand } from '../commands/impl/create-subusers.command';
import { DeleteAllSubusersCommand } from '../commands/impl/delete-allSubusers.command';
import { DeleteSubuserCommand } from '../commands/impl/delete-subuser.command';
import { UpdateSubuserCommand } from '../commands/impl/update-subuser.command';
import { UpdateSubuserDto } from '../dtos/update-subuser.dto';
import { GetAllSubusersQuery } from '../queries/impl/get-all.query';
import { GetOneSubuserQuery } from '../queries/impl/get-one.query';

@UseGuards(JwtGuard)
@Controller('subusers')
export class SubusersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  createOne(@Req() req: any) {
    return this.commandBus.execute(new CreateSubuserCommand(req.user._id));
  }

  @Get('/:id')
  getOne(@Req() req: any, @Param('id') id: string) {
    return this.queryBus.execute(new GetOneSubuserQuery(req.user._id, id));
  }

  @Get()
  getAll(@Req() req: any) {
    return this.queryBus.execute(new GetAllSubusersQuery(req.user._id));
  }

  @Delete('/:id')
  deleteOne(@Req() req: any, @Param('id') id: string) {
    return this.commandBus.execute(new DeleteSubuserCommand(req.user._id, id));
  }

  @Delete()
  deleteAll(@Req() req: any) {
    return this.commandBus.execute(new DeleteAllSubusersCommand(req.user._id));
  }

  @Put('/:id')
  updateOne(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateSubuserDto: UpdateSubuserDto,
  ) {
    return this.commandBus.execute(
      new UpdateSubuserCommand(req.user._id, id, updateSubuserDto),
    );
  }
}
