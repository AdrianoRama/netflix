import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSubusersEvent } from 'src/users/events/impl/delete-subusers.event';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { DeleteUserCommand } from '../impl/delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteUserCommand): Promise<any> {
    this.eventBus.publish(new DeleteSubusersEvent(command.id));
    return this.usersRepository.deleteOne(command.id);
  }
}
