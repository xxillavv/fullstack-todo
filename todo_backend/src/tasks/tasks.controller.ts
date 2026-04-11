import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto, TaskQueryDto, UpdateTaskDto } from '../dto/tasks.dto.js'


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  getAllTasks(@Query() dto: TaskQueryDto) {
    return this.tasksService.getAllTasks(dto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @Put('update/:id')
  updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, dto);
  }

  @Delete('delete/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
