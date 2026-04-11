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