import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { UpdateTaskDto } from './dto/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  getAllTasks() {
    return this.taskRepository.find();
    // return this.taskRepository;
  }
  async getTaskById(id: string) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async updateTask(
    id: string,
    updatedFields: UpdateTaskDto,
  ): Promise<Task | string> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (task) {
      Object.assign(task, updatedFields);
      await this.taskRepository.save(task);

      return task;
    }

    return 'No task found';
  }

  createTask(title: string, description: string) {
    if (!title || !description) {
      throw new BadRequestException('Title and description must not be empty');
    }
    const newTask = {
      title,
      description,
      status: TaskStatus.PENDING,
    };

    // this.tasks.push(newTask);
    return this.taskRepository.save(newTask);
  }

  deleteTask(id: string) {
    return this.taskRepository.delete(id);
  }
}
