import type { IPostTask, TTask } from "../../types/type";
import { baseApi } from "./base.api";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<TTask[], void>({
      query: () => "tasks"
    }),
    getTasksById: builder.query<TTask[], number | undefined>({
      query: (id) => `tasks/user/${id}`,
      providesTags: ["Tasks"]
    }),
    postTask: builder.mutation<TTask, IPostTask>({
      query: ({ taskData, userId }) => ({
        url: `tasks/user/${userId}`,
        method: "POST",
        body: taskData
      }),
      invalidatesTags: ["Tasks"]
    }),
    updateTask: builder.mutation<TTask, { taskId: string, updateData: Partial<TTask> }>({
      query: ({ taskId, updateData }) => ({
        url: `tasks/${taskId}`,
        method: "PATCH",
        body: updateData
      }),
      invalidatesTags: ["Tasks"]
    }),
    deleteTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `tasks/${taskId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Tasks"]
    }),
  })
})