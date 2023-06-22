import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { TaskStatus } from '../task.entity';

class TaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateTaskDto extends TaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;
}

export class UpdateTaskDto extends TaskDto {
  @IsString()
  @IsOptional()
  @IsIn([Object.values(TaskStatus)])
  status?: TaskStatus;
}
