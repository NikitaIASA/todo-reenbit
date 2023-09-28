import { FC } from "react";
import { format } from "date-fns";

import { getCurrentDate } from "@/helpers/getDate";

import "./AddTodoModal.scss";

interface AddTodoModalProps {
  title: string;
  setTitle: (title: string) => void;
  setEndDate: (endDate: string) => void;
  onSave: () => void;
  onClose: () => void;
}

// TODO: min date value for input to display the end date correctly
// TODO: Required fields

export const AddTodoModal: FC<AddTodoModalProps> = ({
  title,
  setTitle,
  setEndDate,
  onClose,
  onSave,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__title">Add New Task</h2>
        <label className="modal__label">Title</label>
        <input
          className="modal__input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="modal__label">Current Date</label>
        <input
          className="modal__input"
          type="text"
          value={getCurrentDate()}
          readOnly
        />
        <label className="modal__label">End Date</label> 
        <input
          className="modal__input"
          type="datetime-local"
          onChange={(e) => {
            const endDay = new Date(e.target.value);
            setEndDate(format(endDay, "dd.MM.yyyy HH:mm"));
          }}
        />
        <div className="modal__buttons">
          <button className="modal__button cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal__button" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
