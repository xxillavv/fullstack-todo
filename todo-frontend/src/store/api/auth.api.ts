import { baseApi } from "./base.api";
import type { IUserData, IUserResponse } from "../../types/type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    regUser: builder.mutation<IUserResponse, IUserData>({
      query: (regData) => ({
        url: 'auth/register',
        method: "POST",
        body: regData,
      })
    }),
    loginUser: builder.mutation<IUserResponse, IUserData>({
      query: (logData) => ({
        url: 'auth/login',
        method: "POST",
        body: logData,
      })
    })
  })
})