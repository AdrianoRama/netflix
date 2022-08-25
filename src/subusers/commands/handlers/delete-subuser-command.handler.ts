import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubusersRepository } from 'src/subusers/repositories/subusers.repository';
import { DeleteSubuserCommand } from '../impl/delete-subuser.command';

@CommandHandler(DeleteSubuserCommand)
export class DeleteSubuserCommandHandler
  implements ICommandHandler<DeleteSubuserCommand>
{
  constructor(private readonly subusersRepository: SubusersRepository) {}

  async execute(command: DeleteSubuserCommand): Promise<any> {
    return this.subusersRepository.deleteOne(command.userId, command.id);
  }
}
