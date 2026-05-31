import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../types/type";


const initialState: IUser = {
  id: null,
  username: "unknown",
  email: "unknown"
}
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.id = action.payload.id
      state.username = action.payload.username
      state.email = action.payload.email
    },
    resetUser: (state) => {
      state.id = null,
      state.username = "unknown",
      state.email = "unknown"
    }
  }
}) 