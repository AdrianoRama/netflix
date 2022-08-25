import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SubusersRepository } from 'src/subusers/repositories/subusers.repository';
import { CreateSubuserCommand } from '../impl/create-subusers.command';

@CommandHandler(CreateSubuserCommand)
export class CreateSubuserCommandHandler
  implements ICommandHandler<CreateSubuserCommand>
{
  constructor(private readonly subusersRepository: SubusersRepository) {}

  async execute(command: CreateSubuserCommand): Promise<any> {
    return this.subusersRepository.create(command.userId);
  }
}
