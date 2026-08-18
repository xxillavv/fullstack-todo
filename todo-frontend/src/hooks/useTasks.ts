import { taskApi } from "../store/api/task.api"
import type { TTaskData } from "../types/type"

export const useTasks = (userId?: number) => {
  const { data: taskList, isLoading: isGetTaskLoading, isError: isGetTaskError, error: getTaskError } = taskApi.useGetTasksByIdQuery(userId,
    { skip: !userId || userId === null })

  const [postTask, { isLoading: isPostTaskLoading, isError: isPostTaskError, error: postTaskError }] = taskApi.usePostTaskMutation()

  const createTask = async (taskData: TTaskData, userId: number) => {
    const isEmpty = Object.values(taskData).every(v => v === '')
    if (isEmpty) return

    const result = await postTask({ taskData, userId })
    return result
  }

  return {
    taskList,
    isGetTaskLoading,
    isGetTaskError,
    getTaskError,

    createTask,
    isPostTaskLoading,
    isPostTaskError,
    postTaskError
  }
}