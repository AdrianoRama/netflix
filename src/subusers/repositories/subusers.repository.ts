import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { User } from 'src/users/models/user.entity';
import { Subuser } from '../models/subuser.entity';

@Injectable()
export class SubusersRepository {
  constructor(
    @InjectModel(Subuser.name) private readonly model: Model<Subuser>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(userId: string) {
    const user = await this.userModel.findById(userId);
    let imageUrl = 'images/defaultUser.jpg';

    if (user.subusers.length === 1) imageUrl = 'images/defaultUser2.jpg';
    else if (user.subusers.length === 2) imageUrl = 'images/defaultUser3.webp';
    else if (user.subusers.length === 3) imageUrl = 'images/defaultUser4.jpg';
    else if (user.subusers.length === 4) imageUrl = 'images/defaultUser5.png';

    const newSubuser = await this.model.create({
      name: 'User',
      image: imageUrl,
      userId,
    });

    user.subusers.push(newSubuser._id);

    await this.userModel.findByIdAndUpdate(
      { _id: user._id },
      { subusers: user.subusers },
    );

    return newSubuser;
  }
}
