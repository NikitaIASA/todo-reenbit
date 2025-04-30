import { AuthApi } from "./auth/auth.api";
import { TasksApi } from "./tasks/tasks.api";

class TodoListApi {
    public auth: AuthApi;
    public tasks: TasksApi;

    constructor() {
        const apiURL = 'http://localhost:4001/api';
        this.auth = new AuthApi(apiURL);
        this.tasks = new TasksApi(apiURL);
    }
}

const todoListApi = new TodoListApi();
export default todoListApi;