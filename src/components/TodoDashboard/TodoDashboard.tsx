import { FC } from "react";

import { ITodoItem } from "@/types/todoItemDto";
import TodoItem from "../TodoItem";

import "./TodoDashboard.scss";

interface ToDoDashboardProps {
  items: ITodoItem[];
}

export const ToDoDashboard: FC<ToDoDashboardProps> = ({ items }) => {
  return (
    <div className="todo-dashboard">
      {items && items.map((item) => <TodoItem key={item.id} item={item} />)}
    </div>
  );
};
