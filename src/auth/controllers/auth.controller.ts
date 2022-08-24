import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignInCommand } from '../commands/impl/signIn.command';
import { SignUpCommand } from '../commands/impl/signup.command';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SignInDto } from '../dtos/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(new SignUpCommand(createUserDto));
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.commandBus.execute(new SignInCommand(signInDto));
  }
}
