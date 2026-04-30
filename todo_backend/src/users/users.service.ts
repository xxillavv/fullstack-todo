import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '../lib/prisma.lib.js';

@Injectable()
export class UsersService {
  constructor(private readonly jwt: JwtService) { }

  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true
      }
    })
  }

  async getMe(req) {
    const accessToken = req.headers.authorization.split(' ')[1]
    const userId = this.jwt.decode(accessToken).sub

    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true
      }
    })
  }
}