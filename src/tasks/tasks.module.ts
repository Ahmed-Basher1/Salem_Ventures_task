import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskSchema } from './task.model';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/jwt.strategy';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  controllers: [TasksController],
  providers: [TasksService, JwtStrategy],
})
export class TasksModule {}
