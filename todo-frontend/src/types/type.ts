export type TTask = {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export type TUpdateTaskData = {
  title?: string
  description?: string
  completed?: boolean
}

export type TCreateTaskData = {
  title: string
  description: string
}


export type IUserRegistrationData = {
  email: string
  password: string
  username: string
}

export type IUserLoginData = Omit<IUserRegistrationData, "username">

export type IUserOptionalData = Partial<IUserRegistrationData>