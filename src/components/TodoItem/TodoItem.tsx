import { FC } from "react";
import clsx from "clsx";

import { ITodoItem } from "@/types/todoItemDto";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleDone, deleteToDo } from "@/redux/actions/todoActions";
import trashIcon from "@/assets/images/trash.svg";
import editIcon from "@/assets/images/edit.svg";

import "./TodoItem.scss";

export interface TodoItemProps {
  item: ITodoItem;
  handleOpenEditModal: (item: ITodoItem) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  item: { id, title, startDate, endDate, done },
  handleOpenEditModal,
}) => {
  const dispatch = useAppDispatch();

  const handleToggleDone = () => {
    dispatch(toggleDone(id));
  };

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure that you want to delete task "${title}"?`)
    ) {
      dispatch(deleteToDo(id));
    }
  };

  const titleClass = clsx("todo-item__title", { done });
  const dateClass = clsx("todo-item__date", { done });
  const editButtonClass = clsx("todo-item__button", { disabled: done });

  return (
    <div className="todo-item">
      <div className="todo-item__title-container">
        <input
          type="checkbox"
          checked={done}
          onChange={handleToggleDone}
          className="todo-item__checkbox"
        />
        <h3 className={titleClass}>{title}</h3>
      </div>
      <p className="todo-item__dates">
        <span className={dateClass}>{startDate}</span>-
        <span className={dateClass}>{endDate}</span>
      </p>
      <div className="todo-item__buttons">
        <button
          className={editButtonClass}
          disabled={done}
          onClick={() =>
            handleOpenEditModal({ id, title, startDate, endDate, done })
          }
        >
          <img
            className="todo-item__button-image"
            src={editIcon}
            alt="edit icon"
          />
        </button>
        <button className="todo-item__button" onClick={handleDelete}>
          <img
            className="todo-item__button-image"
            src={trashIcon}
            alt="trash icon"
          />
        </button>
      </div>
    </div>
  );
};
