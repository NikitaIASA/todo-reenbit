import { FC } from "react";

import { ITodoItem } from "@/types/todoItemDto";
import TodoItem from "../TodoItem";

import "./TodoDashboard.scss";

interface ToDoDashboardProps {
  items: ITodoItem[];
}

export const ToDoDashboard: FC<ToDoDashboardProps> = ({ items }) => {
  return (
    <ul className="todo-dashboard">
      {items &&
        items.map((item) => (
          <li>
            <TodoItem key={item.id} item={item} />
          </li>
        ))}
    </ul>
  );
};
