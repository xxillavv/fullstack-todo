import type { IUser } from "../../types/type";
import { baseApi } from "./base.api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser, void>({
      query: () => "users"
    }),
    getMe: builder.mutation<IUser, string>({
      query: (accessToken) => ({
        url: "users/me",
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    })
  })
})

