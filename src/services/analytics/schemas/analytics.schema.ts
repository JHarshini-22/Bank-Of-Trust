import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpendingCategoryDocument = SpendingCategory & Document;

@Schema({ timestamps: true })
export class SpendingCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;
}

export const SpendingCategorySchema = SchemaFactory.createForClass(SpendingCategory);
