import api from "./axios";
import type { Task, TaskRequestDTO } from "../types/index";

export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await api.get("/v1/tasks");
  return data;
};

// NEW: Fetch specific task by ID
export const fetchTaskById = async (id: number): Promise<Task> => {
  const { data } = await api.get(`/v1/tasks/${id}`);
  return data;
};

export const createTask = async (payload: TaskRequestDTO): Promise<Task> => {
  const { data } = await api.post("/v1/tasks", payload);
  return data;
};

export const updateTask = async (
  id: number,
  payload: TaskRequestDTO,
): Promise<Task> => {
  const { data } = await api.put(`/v1/tasks/${id}`, payload);
  return data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/v1/tasks/${id}`);
};
