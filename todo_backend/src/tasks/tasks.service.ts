import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma.lib.js';
import { UpdateTaskDto } from '../dto/tasks.dto.js';

@Injectable()
export class TasksService {
  getTasks() {
    return prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
      }
    })
  }

  getUserTasks(userId: number) {
    return prisma.task.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
      }
    })
  }

  createTask(userId: number, dto) {
    return prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        user: {
          connect: { id: userId }
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
      }
    })
  }

  updateTask(taskId: string, dto: UpdateTaskDto) {
    return prisma.task.update({
      where: { id: taskId },
      data: {
        title: dto.title,
        description: dto.description,
        completed: dto.completed,
      },
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
      }
    });
  }

  deleteTask(taskId) {
    return prisma.task.delete({
      where: { id: taskId },
    })
  }

  errorHandler() {
    throw new HttpException("error", HttpStatus.BAD_REQUEST)
  }
}
