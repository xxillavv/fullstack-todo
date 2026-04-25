import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '../lib/prisma.lib.js';

@Injectable()
export class UsersService {
  constructor(private readonly jwt: JwtService) {}
  
  async getAllUsers() {
    return await prisma.user.findMany({
      select: {id: true, username: true, email: true}
    })
  }

  async getMe() {
    return await prisma.user.findUnique({
      where: { id: 1 },
      select: {id: true, username: true, email: true}
    })
  }
}