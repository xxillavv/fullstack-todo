import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { InternalServerErrorException } from '@nestjs/common';
import { prisma } from '../lib/prisma.lib.js';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) { }
  private salt = 10

  async regUser(body) {
    try {
      const { email, password, username } = body

      const isExist = await prisma.user.findFirst({
        where: { email }
      })

      if (isExist) {
        throw new ConflictException('User already exists')
      }

      const hashPassword = await bcrypt.hash(password, this.salt)

      const user = await prisma.user.create({
        data: {
          username,
          email,
          hashPassword,
        }
      })

      const authPayload = {
        sub: user.id,
        email: user.email
      }

      const refreshPayload = {
        sub: user.id,
      }

      const accessToken = await this.jwt.sign(authPayload)
      const refreshToken = await this.jwt.sign(refreshPayload, { expiresIn: '7d' })

      console.log('accessToken', accessToken)
      console.log('refreshToken', refreshToken)

      const hashRefreshToken = await bcrypt.hash(refreshToken, this.salt)

      await prisma.user.update({
        where: { id: user.id },
        data: {
          refreshToken: hashRefreshToken
        }
      })

      return { accessToken, data: { id: user.id, email: user.email, username: user.username } }
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error
      }

      throw new InternalServerErrorException('Something went wrong')
    }
  }

  async loginUser(body) {
    try {
      const { password, email } = body

      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) throw new NotFoundException("User not found")

      const isPasswordValid = await bcrypt.compare(password, user.hashPassword)
      if (!isPasswordValid) throw new UnauthorizedException("Incorrect password")

      const accessPayload = { sub: user.id, email: user.email }
      const refreshPayload = { sub: user.id }

      const accessToken = await this.jwt.sign(accessPayload)
      const refreshToken = await this.jwt.sign(refreshPayload)

      await prisma.user.update({
        where: { email },
        data: { refreshToken }
      })

      return { accessToken }

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof UnauthorizedException) throw error

      throw new InternalServerErrorException('Something went wrong')
    }
  }
}
