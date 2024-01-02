import { FC } from "react";

import TodoItem from "../TodoItem";
import NoTodoFound from "../NoTodoFound";
import { ITodoItem } from "@/types/todoItemDto";

import "./TodoDashboard.scss";

interface ToDoDashboardProps {
  searchQuery: string;
  items: ITodoItem[];
  handleOpenEditModal: (item: ITodoItem) => void;
}

export const ToDoDashboard: FC<ToDoDashboardProps> = ({
  searchQuery,
  items,
  handleOpenEditModal,
}) => {
  return (
    <ul className="todo-dashboard">
      {items?.map((item) => (
        <li key={item._id}>
          <TodoItem item={item} handleOpenEditModal={handleOpenEditModal} />
        </li>
      ))}
      {!items.length &&
        (searchQuery ? (
          <p className="nothing-found-message">Nothing found for "{searchQuery}"</p>
        ) : (
          <NoTodoFound />
        ))}
    </ul>
  );
};
