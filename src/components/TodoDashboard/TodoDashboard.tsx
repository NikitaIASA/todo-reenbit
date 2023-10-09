import { FC } from "react";

import TodoItem from "../TodoItem";
import NoTodoFound from "../NoTodoFound";
import { ITodoItem } from "@/types/todoItemDto";
import { useFilteredItems } from "@/hooks/useFilteredTodos";

import "./TodoDashboard.scss";

interface ToDoDashboardProps {
  items: ITodoItem[];
  handleOpenEditModal: (item: ITodoItem) => void;
}

export const ToDoDashboard: FC<ToDoDashboardProps> = ({
  items,
  handleOpenEditModal,
}) => {
  const filteredItems = useFilteredItems(items);

  return (
    <ul className="todo-dashboard">
      {filteredItems?.map((item) => (
        <li key={item.id}>
          <TodoItem item={item} handleOpenEditModal={handleOpenEditModal} />
        </li>
      ))}
      {!filteredItems.length && <NoTodoFound />}
    </ul>
  );
};
