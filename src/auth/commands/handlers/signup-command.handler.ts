import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateSubUserEvent } from 'src/auth/events/impl/create-subuser.event';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { SignUpCommand } from '../impl/signup.command';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SignUpCommand): Promise<any> {
    const newUser = await this.authRepository.signUp(command.createUserDto);
    this.eventBus.publish(new CreateSubUserEvent(newUser._id));
    return newUser;
  }
}
