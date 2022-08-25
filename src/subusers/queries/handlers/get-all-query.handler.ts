import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SubusersRepository } from 'src/subusers/repositories/subusers.repository';
import { GetAllSubusersQuery } from '../impl/get-all.query';

@QueryHandler(GetAllSubusersQuery)
export class GetAllSubusersQueryHandler
  implements IQueryHandler<GetAllSubusersQuery>
{
  constructor(private readonly subusersRepository: SubusersRepository) {}
  async execute(query: GetAllSubusersQuery): Promise<any> {
    return this.subusersRepository.getAll(query.userId);
  }
}
