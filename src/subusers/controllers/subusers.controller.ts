import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateSubuserCommand } from '../commands/impl/create-subusers.command';

@UseGuards(JwtGuard)
@Controller('subusers')
export class SubusersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('/:image')
  getFile(@Res() res: any) {
    const file = createReadStream(join(process.cwd(), 'defaultUser.jpg'));
    file.pipe(res);
  }

  @Post('create')
  createOne(@Req() req: any) {
    return this.commandBus.execute(new CreateSubuserCommand(req.user._id));
  }
}
