import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { RateMovieDto } from '../dtos/rate-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { Movie } from '../models/movie.entity';

@Injectable()
export class MoviesRepository {
  constructor(@InjectModel(Movie.name) private readonly model: Model<Movie>) {}

  async create(createMovieDto: CreateMovieDto) {
    return await this.model.create(createMovieDto);
  }

  async getAll(page: number) {
    return await this.model
      .find()
      .skip((page - 1) * 12)
      .limit(12);
  }

  async getOne(id: string) {
    return await this.model.findById(id);
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const updateInfo = {};

    for (const key in updateMovieDto) {
      updateInfo[key] = updateMovieDto[key];
    }

    return await this.model.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
  }
  async rateMovie(userId: string, id: string, rateMovieDto: RateMovieDto) {
    const movie = await this.getOne(id);

    const found = movie.userRatings.find((rating) => rating.userId === userId);

    if (found) {
      found.rating = rateMovieDto.rating;
      return await this.model.updateOne(
        { _id: movie.id },
        { userRatings: movie.userRatings },
        { new: true },
      );
    }

    return await this.model.updateOne(
      { _id: movie._id },
      { $push: { userRatings: { userId, rating: rateMovieDto.rating } } },
      { new: true },
    );
  }

  // async getTopRated() {
  //   const movies = await this.model.find();

  //   movies.map((movie) => {
  //     let top = 0;
  //     for (const rating of movie.userRatings) {
  //       top += rating.rating;
  //     }
  //   });
  // }
}
