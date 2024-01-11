import { FC } from "react";

import TodoItem from "../TodoItem";
import NoTodoFound from "../NoTodoFound";
import { ITodoItem } from "@/types/todoItemDto";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectError, selectIsLoading, selectSearchQuery } from "@/redux/selectors/todoSelectors";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <ul className="todo-dashboard">
        {items?.map((item) => (
          <li key={item._id}>
            <TodoItem item={item} handleOpenEditModal={handleOpenEditModal} />
          </li>
        ))}
      </ul>
      {!isLoading &&
        !items.length &&
        (searchQuery ? (
          <p className="nothing-found-message">
            Nothing found for "{searchQuery}"
          </p>
        ) : (
          <NoTodoFound />
        ))}
    </>
  );
};
