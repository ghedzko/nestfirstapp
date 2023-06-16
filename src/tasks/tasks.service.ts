import { Injectable } from '@nestjs/common';
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
  getTaskById(id: string) {
    return this.taskRepository.findOne({ where: { id } });
    // return this.tasks.find((task) => task.id === id);
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
