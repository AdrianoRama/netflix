import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/users/enum/roles.enum';
import { User } from 'src/users/models/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async signUp(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    await this.model.create({ ...createUserDto, role: Role.USER });
  }
}
