import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubusersRepository } from 'src/subusers/repositories/subusers.repository';
import { UpdateSubuserCommand } from '../impl/update-subuser.command';

@CommandHandler(UpdateSubuserCommand)
export class UpdateSubuserCommandHandler
  implements ICommandHandler<UpdateSubuserCommand>
{
  constructor(private readonly subusersRepository: SubusersRepository) {}

  async execute(command: UpdateSubuserCommand): Promise<any> {
    return this.subusersRepository.updateOne(
      command.userId,
      command.id,
      command.updateSubuserDto,
    );
  }
}
