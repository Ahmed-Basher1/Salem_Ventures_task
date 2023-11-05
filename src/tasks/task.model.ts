import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, HydratedDocument } from 'mongoose';

// Define an enum for Task status if there are specific allowed values
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  // add other statuses if needed
}

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

// This creates a TaskDocument type that includes mongoose document properties
export type TaskDocument = HydratedDocument<Task>;
