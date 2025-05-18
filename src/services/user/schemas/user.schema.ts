import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole, UserStatus } from '../../../common/interfaces/user.interface';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNumber: string;

  @Prop({ 
    type: String, 
    enum: Object.values(UserRole), 
    default: UserRole.CUSTOMER 
  })
  role: UserRole;

  @Prop({ 
    type: String, 
    enum: Object.values(UserStatus), 
    default: UserStatus.PENDING_VERIFICATION 
  })
  status: UserStatus;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
