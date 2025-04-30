import { FC } from "react";

import { NOT_FOUND_MESSAGES } from "@/consts/Messages";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectFilter } from "@/redux/selectors/tasks.selectors";
import todoIcon from "@/assets/images/todo.png";

import "./NoTodoFound.scss";


export const NoTodoFound: FC = () => {
  const currentFilter = useAppSelector(selectFilter)
  return (
    <div className="no-todo-found">
      <img className="no-todo-found__image" src={todoIcon} alt="todo Icon" />
      <p>{NOT_FOUND_MESSAGES[currentFilter]}</p>
    </div>
  );
};
