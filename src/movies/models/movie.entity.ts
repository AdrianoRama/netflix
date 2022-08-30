import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Movie extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  genres: string[];

  @Prop()
  released: Date;

  @Prop()
  directedBy: string;

  @Prop()
  cast: string[];

  @Prop()
  poster: string;

  @Prop()
  userRatings: { userId: string; rating: number }[];

  @Prop()
  contentRating: ContentRating;

  @Prop()
  type: MediaType;

  @Prop()
  trailers: string[];

  @Prop()
  url: string;

  @Prop()
  duration: number;

  @Prop()
  averageUserRating: number;
}

export enum MediaType {
  MOVIE = 'movie',
  TV_SERIES = 'tv_series',
}

export enum ContentRating {
  PG_13 = 'pg_13',
  G = 'g',
  PG = 'pg',
  R = 'r',
  MA = 'ma',
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
