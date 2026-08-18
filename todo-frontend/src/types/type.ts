export type TTask = {
  id?: string
  title: string
  description: string
  completed: boolean
}

export interface TTaskData {
  title: string
  description: string
}

export interface IPostTask {
  userId: number | null
  taskData: TTaskData
}

export interface IUser {
  id: number
  username: string
  email: string
}

export type TFormStatus = 'register' | 'login' | ''

export interface IUserData {
  username?: string
  email: string
  password: string
}

export interface IUserResponse {
  accessToken: string
  data: IUser
}