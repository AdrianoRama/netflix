import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SubusersRepository } from 'src/subusers/repositories/subusers.repository';
import { GetOneSubuserQuery } from '../impl/get-one.query';

@QueryHandler(GetOneSubuserQuery)
export class GetOneSubuserQueryHandler
  implements IQueryHandler<GetOneSubuserQuery>
{
  constructor(private readonly subusersRepository: SubusersRepository) {}

  async execute(query: GetOneSubuserQuery): Promise<any> {
    return this.subusersRepository.getOne(query.userId, query.id);
  }
}
