import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { GetUserQuery } from '../impl/get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(public readonly usersRepository: UsersRepository) {}

  async execute(query: GetUserQuery): Promise<any> {
    return this.usersRepository.getOne(query.id);
  }
}
