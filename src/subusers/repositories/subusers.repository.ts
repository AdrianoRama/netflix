import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/models/user.entity';
import { UpdateSubuserDto } from '../dtos/update-subuser.dto';
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

    if (user.subusers.length === 5)
      throw new HttpException(
        'No more subusers could be created.',
        HttpStatus.BAD_REQUEST,
      );
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

  async getOne(userId: string, id: string) {
    return await this.model.findOne({ userId: userId, _id: id });
  }

  async getAll(userId: string) {
    return await this.model.find({ userId });
  }

  async deleteOne(userId: string, id: string) {
    return await this.model.findByIdAndDelete({ userId, _id: id });
  }

  async deleteAll(userId: string) {
    return await this.model.deleteMany({ userId });
  }

  async updateOne(
    userId: string,
    id: string,
    updateSubuserDto: UpdateSubuserDto,
  ) {
    return await this.model.findOneAndUpdate(
      { userId, _id: id },
      updateSubuserDto,
      { new: true },
    );
  }
}
