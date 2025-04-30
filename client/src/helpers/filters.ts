import { ITodoItem } from "@/core/api/todo-list/tasks/dto/task.dto";
import { FILTER_OPTIONS} from '@/consts/filterOptions';

export const FILTERS_MAP: Record<string, (items: ITodoItem[]) => ITodoItem[]> = {
    [FILTER_OPTIONS.ALL]: (items) => items,
    [FILTER_OPTIONS.ACTIVE]: (items) => items.filter((item) => !item.completed),
    [FILTER_OPTIONS.COMPLETED]: (items) => items.filter((item) => item.completed),
};
