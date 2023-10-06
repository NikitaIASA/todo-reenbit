import { ITodoItem } from "@/types/todoItemDto";

export const FILTERS_MAP: Record<string, (items: ITodoItem[]) => ITodoItem[]> = {
    ALL: (items) => items,
    ACTIVE: (items) => items.filter((item) => !item.done),
    COMPLETED: (items) => items.filter((item) => item.done),
};