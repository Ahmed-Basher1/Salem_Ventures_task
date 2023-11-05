import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksService } from './tasks.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { TaskDto } from './dtos/task.dto';
import { JwtAuthGuard } from '../users/auth.guard';
import { GetUser } from '../users/get-user.decorator';
import { ObjectId } from 'mongodb';

@Serialize(TaskDto)
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/task')
  async createTask(
    @GetUser() user,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<any> {
    createTaskDto.userId = new ObjectId(user.userId);
    return this.taskService.createTask(createTaskDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getTask(@GetUser() user, @Param('id') id: string): Promise<any> {
    return this.taskService.getTask(id, user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@GetUser() user): Promise<any> {
    return this.taskService.getTasks(user.userId);
  }
}
