import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubusersRepository } from 'src/subusers/repositories/subusers.repository';
import { DeleteSubusersEvent } from '../impl/delete-subusers.event';

@EventsHandler(DeleteSubusersEvent)
export class DeleteSubusersEventHandler
  implements IEventHandler<DeleteSubusersEvent>
{
  constructor(private readonly subusersRepository: SubusersRepository) {}

  handle(event: DeleteSubusersEvent) {
    return this.subusersRepository.deleteAll(event.id);
  }
}
