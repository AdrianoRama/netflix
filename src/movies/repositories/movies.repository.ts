import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { Movie } from '../models/movie.entity';

@Injectable()
export class MoviesRepository {
  constructor(@InjectModel(Movie.name) private readonly model: Model<Movie>) {}

  async create(createMovieDto: CreateMovieDto) {
    return await this.model.create(createMovieDto);
  }

  async getAll(page: number) {
    console.log(page);

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
}
