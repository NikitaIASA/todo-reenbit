import { FC } from "react";

import TodoItem from "../TodoItem";
import NoTodoFound from "../NoTodoFound";
import { ITodoItem } from "@/core/api/todo-list/tasks/dto/task.dto";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  selectError,
  selectIsLoading,
  selectSearchQuery,
} from "@/redux/selectors/tasks.selectors";

import "./TodoDashboard.scss";

interface ToDoDashboardProps {
  items: ITodoItem[];
  handleOpenEditModal: (item: ITodoItem) => void;
}

export const ToDoDashboard: FC<ToDoDashboardProps> = ({
  items,
  handleOpenEditModal,
}) => {
  const searchQuery = useAppSelector(selectSearchQuery);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  if (isLoading) {
    return (
      <div className="todo-dashboard">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="todo-dashboard">
        <div>Error: {error}</div>
      </div>
    );
  }

  if (!isLoading && !items.length) {
    return (
      <div className="todo-dashboard">
        {searchQuery ? (
          <p className="nothing-found-message">
            Nothing found for "{searchQuery}"
          </p>
        ) : (
          <NoTodoFound />
        )}
      </div>
    );
  }
  
  return (
    <div className="todo-dashboard">
      <ul className="todo-dashboard__list">
        {items?.map((item) => (
          <li key={item._id}>
            <TodoItem item={item} handleOpenEditModal={handleOpenEditModal} />
          </li>
        ))}
      </ul>
    </div>
  );
};
