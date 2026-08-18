import { baseApi } from "./base.api";
import type { IUserData, IUserResponse } from "../../types/type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    regUser: builder.mutation<IUserResponse, IUserData>({
      query: (regData) => ({
        url: 'auth/register',
        method: "POST",
        body: regData,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }
        } catch {
          // ignore
        }
      },
      invalidatesTags: ['User', 'Tasks']
    }),
    loginUser: builder.mutation<IUserResponse, IUserData>({
      query: (logData) => ({
        url: 'auth/login',
        method: "POST",
        body: logData,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }
        } catch {
          // ignore
        }
      },
      invalidatesTags: ['User', 'Tasks']
    })
  })
})