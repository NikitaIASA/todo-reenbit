import { FC } from "react";

import { ITodoItem } from "@/types/todoItemDto";
import TodoItem from "../TodoItem";

import "./TodoDashboard.scss";

interface ToDoDashboardProps {
  items: ITodoItem[];
  handleOpenEditModal: (item: ITodoItem) => void;
}

export const ToDoDashboard: FC<ToDoDashboardProps> = ({ items, handleOpenEditModal }) => {
  return (
    <ul className="todo-dashboard">
      {items?.map((item) => (
        <li key={item.id}>
          <TodoItem item={item} handleOpenEditModal={handleOpenEditModal}/>
        </li>
      ))}
    </ul>
  );
};
