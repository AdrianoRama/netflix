import { UpdateSubuserDto } from 'src/subusers/dtos/update-subuser.dto';

export class UpdateSubuserCommand {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly updateSubuserDto: UpdateSubuserDto,
  ) {}
}
