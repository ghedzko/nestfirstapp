import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Do homework',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl aliquet nunc, vita',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: '2',
      title: 'Do Something',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl aliquet nunc, vita',
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }
  getTaskById(id: string): Task | null {
    return this.tasks.find((task) => task.id === id);
  }

  updateTask(id: string, updatedFields: UpdateTaskDto): Task | string {
    const task = this.getTaskById(id);
    if (task) {
      const updatedTask = Object.assign(task, updatedFields);
      this.tasks = this.tasks.map((task) =>
        task.id === id ? updatedTask : task,
      );
      return updatedTask;
    }
    return 'No task found';
  }
  createTask(title: string, description: string) {
    const newTask: Task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: string): Task | null {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    let deletedTask: Task | null = null;

    if (taskIndex !== -1) {
      deletedTask = this.tasks[taskIndex];

      this.tasks.splice(taskIndex, 1);
    }

    return deletedTask;
  }
}
