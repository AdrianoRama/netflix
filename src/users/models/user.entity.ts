import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Subuser } from 'src/subusers/models/subuser.entity';
import { Role } from '../enum/roles.enum';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true })
  birthday: Date;

  @Prop({ isRequired: true, unique: true })
  email: string;

  @Prop({ isRequired: true, unique: true })
  username: string;

  @Prop({ isRequired: true })
  password: string;

  @Prop()
  image: string;

  @Prop()
  role: Role;

  @Prop({ isRequired: true })
  plan: Plan;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Subuser.name }] })
  subusers: Subuser[];

  @Prop()
  ratedMovies: [{ id: string; title: string; rating: number }];
}

export enum Plan {
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

export const UserSchema = SchemaFactory.createForClass(User);
