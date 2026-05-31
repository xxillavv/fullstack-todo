import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TTask } from "../types/type";

const initialState: TTask[] = []
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction) => {

    },
    removeTask: (state, action: PayloadAction<string>) => {

    }
  }
})