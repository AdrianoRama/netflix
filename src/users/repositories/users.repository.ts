import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../models/user.entity';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async getUserDetails(id: string) {
    const user = await this.model.findOne({ _id: id });
    user.password = undefined;
    return user;
  }

  async getAll() {
    const users = await this.model.find();
    return users.map((user) => {
      user.password = undefined;
      return user;
    });
  }

  async getOne(id: string) {
    return this.getUserDetails(id);
  }

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto) {
    // const updateInfo = {};

    // for (const key in updateUserDto) {
    //   updateInfo[key] = updateUserDto[key];
    // }

    return await this.model.findOneAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }

  async userRatedMovie(
    userId: string,
    id: string,
    title: string,
    rating: number,
  ) {
    const user = await this.getOne(userId);
    const found = user.ratedMovies.find((movie) => movie.id === id);

    if (found) {
      found.rating = rating;
      return await this.model.updateOne(
        { _id: user.id },
        { ratedMovies: user.ratedMovies },
        { new: true },
      );
    } else
      return await this.model.updateOne(
        { _id: userId },
        { $push: { ratedMovies: { id, title, rating } } },
        { new: true },
      );
  }
}
