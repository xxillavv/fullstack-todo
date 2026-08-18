import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto, UpdateTaskDto } from '../dto/tasks.dto.js'


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  getTasks() {
    return this.tasksService.getTasks()
  }

  @Get("user/:id")
  getUserTasks(@Param("id", ParseIntPipe) userId: number) {
    return this.tasksService.getUserTasks(userId)
  }

  @Post("user/:id")
  createTask(@Param("id", ParseIntPipe) userId: number, @Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(userId, dto);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, dto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Get('error')
  errorHandler() {
    return this.tasksService.errorHandler()
  }
}
