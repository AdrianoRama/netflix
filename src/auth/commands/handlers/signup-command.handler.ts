import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { SignUpCommand } from '../impl/signup.command';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: SignUpCommand): Promise<any> {
    return this.authRepository.signUp(command.createUserDto);
  }
}
