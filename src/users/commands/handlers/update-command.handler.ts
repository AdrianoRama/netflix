import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { UpdateCommand } from '../impl/update.command';

@CommandHandler(UpdateCommand)
export class UpdateCommandHandler implements ICommandHandler<UpdateCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: UpdateCommand): Promise<any> {
    return this.usersRepository.updateOne(command.id, command.updateUserDto);
  }
}
