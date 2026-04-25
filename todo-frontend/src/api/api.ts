import { Axios } from "axios"
import type { TCreateTaskData, TUpdateTaskData } from "../types/type"

const axios = new Axios()

export const API_URL: string = "https://backend-todo-wqxq.onrender.com/api"

  
export const getTasks = async (page: number) => {
  try {
    const response = await axios.get(`${API_URL}/tasks?limit=5&page=${page}`)

    const tasks = await JSON.parse(response.data)
    return tasks
  } catch {
    throw new Error("Failed to fetch tasks")
  }
}

export const getTaskById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${id}`)
    const task = await JSON.parse(response.data)
    return task
  } catch {
    throw new Error("Failed to fetch task")
  }
}

export const createTask = async (data: TCreateTaskData) => {
  try {
    if (!data) {
      throw new Error("Data is required to create a task")
    }
    const response = await axios.post(`${API_URL}/tasks`, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    })
    const task = await JSON.parse(response.data)
    return task

  } catch {
    throw new Error("Failed to create task")
  }
}

export const updateTask = async (id: string, data: TUpdateTaskData) => {
  try {
    if (!data) {
      throw new Error("Data is required to update a task")
    }
    const response = await axios.put(`${API_URL}/tasks/update/${id}`, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    })
    const task = await JSON.parse(response.data)
    return task
  } catch {
    throw new Error("Failed to update task")
  }
}

export const deleteTask = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/tasks/delete/${id}`)
  } catch {
    throw new Error("Failed to delete task")
  }
}

export const registerUser = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    })
    return JSON.parse(response.data)
  } catch {
    throw new Error("Failed to register user")
  }
}

export const getUserByToken = async (accessToken: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return JSON.parse(response.data)
  } catch {
    throw new Error("Failed to fetch user data")
  }
}