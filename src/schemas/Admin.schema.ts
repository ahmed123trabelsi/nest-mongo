import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop()
  username: string;

  @Prop()
  password: string;

  // any other fields you want to include
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
