import { FC } from "react";
import { useSearchParams } from "react-router-dom";

import { SEARCH_PARAM_KEYS, TASK_FILTER_VALUES } from "@/consts/searchParams";
import { NOT_FOUND_MESSAGES } from "@/consts/Messages";
import todoIcon from "@/assets/images/todo.png";

import "./NoTodoFound.scss";

export const NoTodoFound: FC = () => {
  const [searchParams] = useSearchParams();
  const currentFilter = searchParams.get(SEARCH_PARAM_KEYS.FILTER) || TASK_FILTER_VALUES.ALL;

  return (
    <div className="no-todo-found">
      <img className="no-todo-found__image" src={todoIcon} alt="todo Icon" />
      <p>{NOT_FOUND_MESSAGES[currentFilter]}</p>
    </div>
  );
};
