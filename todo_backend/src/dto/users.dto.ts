import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(4, 16)
  username?: string

  @IsString()
  @Length(8, 24)
  password?: string

  @IsString()
  @IsEmail()
  email?: string
}

export class LoginUserDto {
  @IsString()
  @Length(8, 24)
  password?: string

  @IsString()
  @IsEmail()
  email?: string
}