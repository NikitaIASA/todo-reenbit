import { AxiosInstance } from 'axios';
import { getAxios } from '@/core/api';
import { ITodoItem, IUserTasksResponse } from '@/core/api/todo-list/tasks/dto/task.dto';

export class TasksApi {
    private axios: AxiosInstance;
    private apiURL: string;

    constructor(apiURL: string) {
        this.axios = getAxios();
        this.apiURL = apiURL;
    }

    public async fetchTodos(search: string, status: string): Promise<IUserTasksResponse> {
        const { data } = await this.axios.get(`${this.apiURL}/tasks?status=${status}&search=${search}`);
        return data;
    }

    public async createTodo(taskData: { title: string; createdDate: string; expiredDate: string }): Promise<ITodoItem> {
        const { data } = await this.axios.post(`${this.apiURL}/tasks`, taskData);
        return data;
    }

    public async updateTodo(
        taskId: string,
        updates: Partial<{ title: string; createdDate: string; expiredDate: string; completed: boolean }>
    ): Promise<ITodoItem> {
        const { data } = await this.axios.put(`${this.apiURL}/tasks/${taskId}`, updates);
        return data;
    }

    public async deleteTodo(taskId: string): Promise<void> {
        await this.axios.delete(`${this.apiURL}/tasks/${taskId}`);
    }

    public async deleteCompletedTodos(): Promise<void> {
        await this.axios.delete(`${this.apiURL}/tasks/completed`);
    }
}
