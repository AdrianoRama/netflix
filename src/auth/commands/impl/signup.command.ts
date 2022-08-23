import { CreateUserDto } from 'src/auth/dtos/create-user.dto';

export class SignUpCommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
