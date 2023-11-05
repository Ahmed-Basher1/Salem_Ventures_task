import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class TaskDto {
  @Expose({ name: 'id' })
  _id: Types.ObjectId;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  status: string;
}
