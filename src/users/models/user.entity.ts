import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
}

export const UserSchema = SchemaFactory.createForClass(User);
