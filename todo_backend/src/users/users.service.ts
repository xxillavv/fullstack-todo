import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '../lib/prisma.lib.js';
import * as bcrypt from 'bcrypt';

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

  async updateToken(req) {
    const headersAuthorization = req.headers.authorization
    const refreshToken = headersAuthorization.split(' ')[1]

    const payload = await this.jwt.verifyAsync(refreshToken)

    const userData = await prisma.user.findFirst({
      where: { id: payload.sub },
      select: {
        refreshToken: true,
        email: true
      }
    })

    console.log(userData?.refreshToken)

    if (!userData?.refreshToken) throw new UnauthorizedException()

    const isValid = await bcrypt.compare(refreshToken, userData.refreshToken)

    if (!isValid) throw new UnauthorizedException()

    const isRefreshValid = await this.jwt.verifyAsync(refreshToken)

    if (!isRefreshValid) throw new UnauthorizedException()

    const accessPayload = { sub: payload.sub, email: userData.email }
    const refreshPayload = { sub: payload.sub }

    const newAccessToken = await this.jwt.signAsync(accessPayload, { expiresIn: '10m' })
    const newRefreshToken = await this.jwt.signAsync(refreshPayload, { expiresIn: '7d' })

    return {
      refreshToken: newRefreshToken,
      accessToken: newAccessToken
    }
  }
}