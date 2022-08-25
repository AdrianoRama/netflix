import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/users/enum/roles.enum';
import { User } from 'src/users/models/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from '../dtos/signIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly model: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return await this.model.create({
      ...createUserDto,
      role: Role.USER,
      subUsers: [],
    });
  }

  async validate(signInDto: SignInDto) {
    const { username, password } = signInDto;
    const found = await this.model.findOne({ username });

    if (!found)
      throw new HttpException('Wrong credentials!', HttpStatus.UNAUTHORIZED);

    const passMatch = await bcrypt.compare(password, found.password);

    if (!passMatch)
      throw new HttpException('Wrong credentials!', HttpStatus.UNAUTHORIZED);

    found.password = undefined;
    return found;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validate(signInDto);
    const token = await this.jwtService.signAsync(
      { _id: user._id, username: user.username, role: user.role },
      { secret: 'secret' },
    );
    return { token, user };
  }
}
