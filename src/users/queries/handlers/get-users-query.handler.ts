import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { GetUsersQuery } from '../impl/get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<any> {
    return this.usersRepository.getAll();
  }
}
