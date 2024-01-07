import { FC } from "react";

import TodoItem from "../TodoItem";
import NoTodoFound from "../NoTodoFound";
import { ITodoItem } from "@/types/todoItemDto";
import { useFilteredItems } from "@/hooks/useFilteredTodos";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectError, selectIsLoading } from "@/redux/selectors/todoSelectors";

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
  const filteredItems = useFilteredItems(items, searchQuery);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  if (isLoading) return <div className="todo-dashboard">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ul className="todo-dashboard">
        {filteredItems?.map((item) => (
          <li key={item._id}>
            <TodoItem item={item} handleOpenEditModal={handleOpenEditModal} />
          </li>
        ))}
      </ul>
      {!filteredItems.length &&
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
