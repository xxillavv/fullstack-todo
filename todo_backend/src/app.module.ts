import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module.js';
import { AuthModule } from './auth/auth.module.js'
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module.js';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "MY-SECRET-KEY",
      signOptions: { expiresIn: '15m' }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
