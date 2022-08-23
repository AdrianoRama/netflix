import { UpdateUserDto } from 'src/users/dtos/update-user.dto';

export class UpdateCommand {
  constructor(
    public readonly id: string,
    public readonly updateUserDto: UpdateUserDto,
  ) {}
}
