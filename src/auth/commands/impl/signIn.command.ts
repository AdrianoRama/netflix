import { SignInDto } from 'src/auth/dtos/signIn.dto';

export class SignInCommand {
  constructor(public readonly signInDto: SignInDto) {}
}
