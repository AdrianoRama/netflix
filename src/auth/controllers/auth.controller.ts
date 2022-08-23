import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignUpCommand } from '../commands/impl/signup.command';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(new SignUpCommand(createUserDto));
  }
}
