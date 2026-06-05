import { Task } from "../types/Task";
import { API_URL } from "@/constants/api";

const TASKS_URL = `${API_URL}/tasks`;

export const taskService = {
    async getAll(): Promise<Task[]> {
        const response = await fetch(TASKS_URL);
        return response.json();
    },

    async create(task: Omit<Task, "id">): Promise<Task> {
        const response = await fetch(TASKS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        return response.json();
    },

    async update(task: Task): Promise<Task> {
        const response = await fetch(`${TASKS_URL}/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        return response.json();
    },

    async delete(id: number): Promise<void> {
        await fetch(`${TASKS_URL}/${id}`, {
            method: "DELETE",
        });
    }
}