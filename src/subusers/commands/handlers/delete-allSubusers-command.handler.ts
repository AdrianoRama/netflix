import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubusersRepository } from 'src/subusers/repositories/subusers.repository';
import { DeleteAllSubusersCommand } from '../impl/delete-allSubusers.command';

@CommandHandler(DeleteAllSubusersCommand)
export class DeleteAllSubusersCommandHandler
  implements ICommandHandler<DeleteAllSubusersCommand>
{
  constructor(private readonly subusersRepository: SubusersRepository) {}

  async execute(command: DeleteAllSubusersCommand): Promise<any> {
    return this.subusersRepository.deleteAll(command.userId);
  }
}
