import { FC } from "react";
import clsx from "clsx";

import { ITodoItem } from "@/types/todoItemDto";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleDone } from "@/redux/actions/todoAction";
import { deleteToDo } from "@/redux/actions/todoAction";
import trash from "@/assets/images/trash.svg";

import "./TodoItem.scss";

export interface TodoItemProps {
  item: ITodoItem;
}

export const TodoItem: FC<TodoItemProps> = ({
  item: { id, title, startDate, endDate, done },
}) => {
  const dispatch = useAppDispatch();

  const handleToggleDone = () => {
    dispatch(toggleDone(id));
  };

  const handleDelete = () => {
    dispatch(deleteToDo(id));
  };

  const titleClass = clsx("todo-item__title", { done });
  const dateClass = clsx("todo-item__date", { done });

  return (
    <div className="todo-item">
      <div className="todo-item__title-container">
        <h3 className={titleClass}>{title}</h3>
        <input
          type="checkbox"
          checked={done}
          onChange={handleToggleDone}
          className="todo-item__checkbox"
        />
      </div>
      <p className="todo-item__dates">
        <span className={dateClass}>{startDate}</span>-
        <span className={dateClass}>{endDate}</span>
      </p>
      <div className="todo-item__buttons">
        <button className="todo-item__button" onClick={handleDelete}>
          <img src={trash} alt="trash icon" />
        </button>
      </div>
    </div>
  );
};
