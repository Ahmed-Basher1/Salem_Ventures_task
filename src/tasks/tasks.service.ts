import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './task.model';
import { Model, Types } from 'mongoose';
@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return await createdTask.save();
  }
  async getTasks(userId: Types.ObjectId): Promise<Task[]> {
    return await this.taskModel.find({ userId }).exec();
  }
  async getTask(id: string, userId: Types.ObjectId): Promise<Task> {
    return await this.taskModel.findOne({ _id: id, userId }).exec();
  }
}
