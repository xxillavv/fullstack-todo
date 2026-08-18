import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto, LoginUserDto } from '../dto/users.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  regUser(@Body() body: CreateUserDto) {
    return this.authService.regUser(body)
  }

  @Post('login')
  loginUser(@Body() body: LoginUserDto) {
    return this.authService.loginUser(body)
  }
}
