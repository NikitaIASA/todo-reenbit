import { FC } from "react";
import { format, addMinutes } from "date-fns";

import { getCurrentDate } from "@/helpers/getDate";
import { DATE_FORMAT, MIN_DATE_FORMAT } from "@/consts/dateFormats";
import { ADD_FIVE_MINUTES } from "@/consts/timeFrames";

import "./AddTodoModal.scss";

interface AddTodoModalProps {
  title: string;
  validationMessage: string;
  setTitle: (title: string) => void;
  setEndDate: (endDate: string) => void;
  setValidationMessage: (validationMessage: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export const AddTodoModal: FC<AddTodoModalProps> = ({
  title,
  validationMessage,
  setTitle,
  setEndDate,
  setValidationMessage,
  onClose,
  onSave,
}) => {
  const currentDate = new Date();
  const minDate = addMinutes(currentDate, ADD_FIVE_MINUTES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      setValidationMessage("Title cannot be empty or contain only spaces");
    } else {
      onSave();
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const endDay = new Date(e.target.value);
    setEndDate(format(endDay, DATE_FORMAT));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__title">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <label className="modal__label">Title</label>
          <input
            className="modal__input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
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
            onChange={handleEndDateChange}
            min={format(minDate, MIN_DATE_FORMAT)}
            required
          />
          <div className="modal__buttons">
            <button className="modal__button cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="modal__button" type="submit">
              Save
            </button>
          </div>
          {validationMessage && (
            <p className="validation-message">{validationMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};
