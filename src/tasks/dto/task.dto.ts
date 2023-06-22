import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { TaskStatus } from '../task.entity';
import { ApiProperty } from '@nestjs/swagger';

class TaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The description of the task',
    type: String,
    example: 'This is the description of my first task',
    required: false,
  })
  description?: string;
}

export class CreateTaskDto extends TaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'The title of the task',
    type: String,
    example: 'My swagger task',
    required: true,
  })
  title: string;
}

export class UpdateTaskDto extends CreateTaskDto {
  @IsString()
  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  @ApiProperty({
    description: 'The status of the task',
    type: String,
    example: TaskStatus.IN_PROGRESS,
    enum: Object.values(TaskStatus),
    required: false,
  })
  status?: TaskStatus;
}
