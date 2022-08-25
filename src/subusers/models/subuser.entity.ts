import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Subuser extends Document {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  userId: string;
}

export const SubuserSchema = SchemaFactory.createForClass(Subuser);
