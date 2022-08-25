import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubusersRepository } from 'src/subusers/repositories/subusers.repository';
import { CreateSubUserEvent } from '../impl/create-subuser.event';

@EventsHandler(CreateSubUserEvent)
export class CreateSubUserEventHandler
  implements IEventHandler<CreateSubUserEvent>
{
  constructor(private readonly subUsersRepository: SubusersRepository) {}

  handle(event: CreateSubUserEvent) {
    return this.subUsersRepository.create(event.userId);
  }
}
