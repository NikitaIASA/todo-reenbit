export interface ITodoItem {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
}

export interface ITodoListAction {
    type: string,
    payload: ITodoItem,
    data: ITodoItem[]
}
