import { FC } from "react";
import clsx from "clsx";
import parse from "date-fns/parse";

import ConfirmationModal from "../../ConfirmationModal";
import { ITodoItem } from "@/types/todoItemDto";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteToDo } from "@/redux/actions/todoActions";
import { DATE_FORMAT } from "@/consts/dateFormats";
import { useModal } from "@/hooks/useModal";
import TrashIcon from "@/assets/images/trash.svg?react";
import EditIcon from "@/assets/images/edit.svg?react";
import { CONFIRMATION_MESSAGES } from "@/consts/Messages";
import { editTask } from "@/redux/thunks/tasksThunks";
import { formatDate } from "@/helpers/getDate";

import "./TodoItem.scss";

export interface TodoItemProps {
  item: ITodoItem;
  handleOpenEditModal: (item: ITodoItem) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  item: { _id, title, createdDate, expiredDate, completed },
  handleOpenEditModal,
}) => {
  const dispatch = useAppDispatch();

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleToggleDone = () => {
    dispatch(editTask(_id, { completed: !completed }));
  };

  const handleConfirmDelete = () => {
    dispatch(deleteToDo(_id));
    closeModal();
  };

  const endDateParsed = parse(expiredDate, DATE_FORMAT, new Date());

  const titleClass = clsx("todo-item__title", { completed });
  const dateClass = clsx("todo-item__date", { completed });
  const todoItemClass = clsx("todo-item", {
    expired: !completed && endDateParsed < new Date(),
  });
  const editButtonClass = clsx("todo-item__button", { disabled: completed });

  return (
    <>
      <div className={todoItemClass}>
        <div className="todo-item__title-container">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleToggleDone}
            className="todo-item__checkbox"
          />
          <h3 className={titleClass}>{title}</h3>
        </div>
        <p className="todo-item__dates">
        <span className={dateClass}>{formatDate(createdDate)}</span>-
          <span className={dateClass}>{formatDate(expiredDate)}</span>
        </p>
        <div className="todo-item__buttons">
          <button
            className={editButtonClass}
            disabled={completed}
            onClick={() =>
              handleOpenEditModal({
                _id,
                title,
                createdDate,
                expiredDate,
                completed,
              })
            }
          >
            <EditIcon className="todo-item__button-image" />
          </button>
          <button className="todo-item__button" onClick={openModal}>
            <TrashIcon className="todo-item__button-image" />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          message={`${CONFIRMATION_MESSAGES.DELETE_ONE_TASK} "${title}"?`}
          onConfirm={handleConfirmDelete}
          onClose={closeModal}
        />
      )}
    </>
  );
};
