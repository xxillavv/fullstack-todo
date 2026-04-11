import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength } from "class-validator"

export class CreateTaskDto {
  @IsString()
  @MaxLength(64)
  title?: string

  @IsString()
  @MaxLength(128)
  description?: string
}

export class UpdateTaskDto {
  @IsString()
  @MaxLength(64)
  title?: string

  @IsString()
  @MaxLength(128)
  description?: string

  @IsBoolean()
  completed?: boolean
}

export class TaskQueryDto {
  @IsOptional()
  @IsString()
  limit?: string

  @IsOptional()
  @IsString()
  page?: string
}