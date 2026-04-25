import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest()

      const authHeader = request.headers.authorization
      if (!authHeader) return false

      const token = authHeader.split(' ')[1]
      const isValid = await this.jwt.verifyAsync(token)

      if (isValid) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
}