import { FC } from "react";

import { ITodoItem } from "@/types/todoItemDto";

import "./TodoItem.scss";

export interface TodoItemProps {
  item: ITodoItem;
}

export const TodoItem: FC<TodoItemProps> = ({
  item: { title, startDate, endDate },
}) => {
  return (
    <div className="todo-item">
      <h3 className="todo-item__title">{title}</h3>
      <p className="todo-item__dates">
        <span className="todo-item__start-date">{startDate}</span>-
        <span className="todo-item__end-date">{endDate}</span>
      </p>
    </div>
  );
};
