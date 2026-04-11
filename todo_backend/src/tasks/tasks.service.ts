import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma.lib.js';

@Injectable()
export class TasksService {
  async getAllTasks(dto) {
    const { limit, page } = dto;

    const tasks = await prisma.task.findMany({
      take: limit ? parseInt(limit) : undefined,
      skip: page ? (parseInt(page) - 1) * parseInt(limit) : undefined,
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
      }
    });

    const total = await prisma.task.count()

    return { tasks, total }
  }

  getTaskById(id) {
    return prisma.task.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
      }
    })
  }

  createTask(dto) {
    return prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
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
