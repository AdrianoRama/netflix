import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { SignInCommand } from '../impl/signIn.command';

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: SignInCommand): Promise<any> {
    return this.authRepository.signIn(command.signInDto);
  }
}
