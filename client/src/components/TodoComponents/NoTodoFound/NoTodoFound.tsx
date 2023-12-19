import { FC } from "react";

import { useAppSelector } from "@/hooks/useAppSelector";
import { selectFilter } from "@/redux/selectors/filterSelectors";
import { NOT_FOUND_MESSAGES } from "@/consts/Messages";
import todoIcon from "@/assets/images/todo.png";

import "./NoTodoFound.scss";

export const NoTodoFound: FC = () => {
  const filter = useAppSelector(selectFilter);

  return (
    <div className="no-todo-found">
      <img className="no-todo-found__image" src={todoIcon} alt="todo Icon" />
      <p>{NOT_FOUND_MESSAGES[filter]}</p>
    </div>
  );
};
