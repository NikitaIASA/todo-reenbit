export const NOT_FOUND_MESSAGES: Record<string, string> = {
    all: "There are no tasks",
    active: "There are no active tasks",
    completed: "There are no completed tasks",
};

export enum ERROR_MESSAGES {
    EMPTY_TITLE = "Title cannot be empty or contain only spaces",
    INVALID_SYMBOLS = "No special symbols allowed"
}

export enum CONFIRMATION_MESSAGES {
    DELETE_ALL_COMPLETED = "Are you sure that you want to delete all completed tasks?",
    DELETE_ONE_TASK = "Are you sure that you want to delete task",
}
