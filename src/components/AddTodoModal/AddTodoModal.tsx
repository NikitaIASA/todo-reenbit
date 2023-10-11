import { FC } from "react";
import { format, parse } from "date-fns";
import DatePicker from "react-datepicker";

import { DATE_FORMAT, TIME_FORMAT, TIME_INTERVAL } from "@/consts/dateFormats";
import { MAX_INPUT_LENGTH } from "@/consts/inputLength";
import { getMinDate, getMaxDate } from "@/helpers/getDate";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getUniqueId } from "@/helpers/getUniqueId";
import { useTodoContext } from "@/context/TodoContext";
import { isValid } from "@/helpers/isValid";
import { editTodo, addTodo } from "@/redux/actions/todoActions";
import { useSwitchCompletedFilter } from "@/hooks/useCompletedSwitch";

import "react-datepicker/dist/react-datepicker.css";
import "./AddTodoModal.scss";

interface AddTodoModalProps {
  onClose: () => void;
}

export const AddTodoModal: FC<AddTodoModalProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const {
    modalTitle,
    setModalTitle,
    startDate,
    endDate,
    setEndDate,
    modalValidationMessage,
    setModalValidationMessage,
    editItem,
    resetData,
  } = useTodoContext();
  const { switchCompletedFilter } = useSwitchCompletedFilter();

  const expirationDate = endDate
    ? parse(endDate, DATE_FORMAT, new Date())
    : null;

  // Prevent click propagation within the modal (to close modal when user clicks outside it)
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const preventKeyDownSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalTitle.trim()) {
      handleSave();
    } else {
      setModalValidationMessage("Title cannot be empty or contain only spaces");
    }
  };

  const handleSave = () => {
    if (isValid(modalTitle)) {
      const newTodo = {
        id: editItem ? editItem.id : getUniqueId(),
        title: modalTitle,
        startDate,
        endDate,
        done: false,
      };
      if (editItem) {
        dispatch(editTodo(newTodo));
      } else {
        dispatch(addTodo(newTodo));
      }
      switchCompletedFilter();
      onClose();
      resetData();
    } else {
      setModalValidationMessage("No special symbols allowed");
    }
  };

  const handleModalClose = () => {
    onClose();
    resetData();
  };

  return (
    <div className="modal-overlay" onClick={handleModalClose}>
      <div className="modal" onClick={handleModalClick}>
        <h2 className="modal__title">
          {editItem ? "Edit Task" : "Add New Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="modal__label">Title</label>
          <input
            className="modal__input"
            type="text"
            value={modalTitle}
            onChange={(e) => setModalTitle(e.target.value)}
            onKeyDown={preventKeyDownSubmit}
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
            onChange={(date) =>
              setEndDate(date ? format(date, DATE_FORMAT) : "")
            }
            todayButton="Today"
            timeFormat={TIME_FORMAT}
            dateFormat={DATE_FORMAT}
            timeIntervals={TIME_INTERVAL}
            placeholderText="Select expiration date"
            showTimeSelect
            minDate={new Date()}
            minTime={getMinDate(expirationDate)}
            maxTime={getMaxDate(new Date())}
            required
          />
          <div className="modal__buttons">
            <button className="modal__button cancel" onClick={handleModalClose}>
              Cancel
            </button>
            <button className="modal__button" type="submit">
              Save
            </button>
          </div>
          {modalValidationMessage && (
            <p className="validation-message">{modalValidationMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};
