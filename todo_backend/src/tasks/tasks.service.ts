import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma.lib.js';

@Injectable()
export class TasksService {
  getTasks() {
    return prisma.task.findMany()
  }

  getUserTasks(userId) {
    return prisma.task.findMany({
      where: { userId }
    })
  }

  createTask(dto) {
    return prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        user: {
          connect: { id: dto.userId }
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

  updateTask(userId, dto) {
    return prisma.task.update({
      where: { id: userId },
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
}
