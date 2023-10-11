import { FC } from "react";
import clsx from "clsx";
import parse from "date-fns/parse";
import { DATE_FORMAT } from "@/consts/dateFormats";

import { ITodoItem } from "@/types/todoItemDto";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toggleDone, deleteToDo } from "@/redux/actions/todoActions";
import TrashIcon from "@/assets/images/trash.svg?react";
import EditIcon from "@/assets/images/edit.svg?react";

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
  const endDateParsed = parse(endDate, DATE_FORMAT, new Date())
  console.log(endDateParsed);
  
  const titleClass = clsx("todo-item__title", { done });
  const dateClass = clsx("todo-item__date", { done });
  const todoItemClass = clsx("todo-item", {
    expired: endDateParsed < new Date(),
  });
  const editButtonClass = clsx("todo-item__button", { disabled: done });

  return (
    <div className={todoItemClass}>
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
          <EditIcon className="todo-item__button-image" />
        </button>
        <button className="todo-item__button" onClick={handleDelete}>
          <TrashIcon className="todo-item__button-image" />
        </button>
      </div>
    </div>
  );
};
