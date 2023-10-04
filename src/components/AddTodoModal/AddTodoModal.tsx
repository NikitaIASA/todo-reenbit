import { FC } from "react";
import { format, parse } from "date-fns";
import DatePicker from "react-datepicker";

import { DATE_FORMAT, TIME_INTERVAL } from "@/consts/dateFormats";
import { MAX_INPUT_LENGTH } from "@/consts/inputLength";
import { getMinDate, getMaxDate } from "@/helpers/getDate";

import "react-datepicker/dist/react-datepicker.css";
import "./AddTodoModal.scss";

interface AddTodoModalProps {
  title: string;
  endDate: string;
  startDate: string;
  validationMessage: string;
  isEditMode: boolean;
  setTitle: (title: string) => void;
  setEndDate: (endDate: string) => void;
  setValidationMessage: (validationMessage: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export const AddTodoModal: FC<AddTodoModalProps> = ({
  title,
  endDate,
  startDate,
  validationMessage,
  isEditMode,
  setTitle,
  setEndDate,
  setValidationMessage,
  onClose,
  onSave,
}) => {
  // Prevent click propagation within the modal (to close modal when user clicks outside it)
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave();
    } else {
      setValidationMessage("Title cannot be empty or contain only spaces");
    }
  };

  const expirationDate = endDate
    ? parse(endDate, "dd.MM.yyyy HH:mm", new Date())
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={handleModalClick}>
      <h2 className="modal__title">{isEditMode ? "Edit Task" : "Add New Task"}</h2>
        <form onSubmit={handleSubmit}>
          <label className="modal__label">Title</label>
          <input
            className="modal__input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={MAX_INPUT_LENGTH}
            required
          />
          <label className="modal__label">Creation date</label>
          <input
            className="modal__input"
            type="text"
            value={startDate}
            readOnly
          />
          <label className="modal__label">Expiration date</label>
          <DatePicker
            className="modal__input"
            showIcon
            selected={expirationDate}
            onChange={(date) => setEndDate(date ? format(date, DATE_FORMAT) : "")}
            todayButton="Today"
            timeFormat="HH:mm"
            dateFormat="dd.MM.yyyy HH:mm"
            timeIntervals={TIME_INTERVAL}
            placeholderText="Select expiration date"
            showTimeSelect
            minDate={new Date()}
            minTime={getMinDate(expirationDate)}
            maxTime={getMaxDate(new Date())}
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
