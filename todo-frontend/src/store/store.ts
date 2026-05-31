import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from './api/task.api';
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "../features/userSlice";

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    
    [userSlice.name]: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)