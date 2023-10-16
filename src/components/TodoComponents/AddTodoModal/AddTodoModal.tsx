import { FC } from "react";
import { format, parse, isToday, setHours, setMinutes } from "date-fns";
import DatePicker from "react-datepicker";

import CustomButton from "../../UI/CustomButton";
import { ITodoItem } from "@/types/todoItemDto";
import { TodoType } from "@/types/todoItemDto";
import { DATE_FORMAT, TIME_FORMAT, TIME_INTERVAL } from "@/consts/dateFormats";
import { MAX_INPUT_LENGTH } from "@/consts/inputLength";
import { getMinDate, getMaxDate } from "@/helpers/getDate";
import { getUniqueId } from "@/helpers/getUniqueId";
import { isValid } from "@/helpers/isValid";
import { editTodo, addTodo } from "@/redux/actions/todoActions";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSwitchCompletedFilter } from "@/hooks/useCompletedSwitch";

import "react-datepicker/dist/react-datepicker.css";
import "./AddTodoModal.scss";

interface AddTodoModalProps {
  todo: TodoType;
  modalTitle: string;
  editItem: ITodoItem | null;
  modalValidationMessage: string;
  updateTodo: (updates: Partial<TodoType>) => void;
  setModalValidationMessage: (message: string) => void;
  setModalTitle: (modalTitle: string) => void;
  resetData: () => void;
  onClose: () => void;
}

export const AddTodoModal: FC<AddTodoModalProps> = ({
  todo,
  modalTitle,
  updateTodo,
  modalValidationMessage,
  setModalValidationMessage,
  setModalTitle,
  editItem,
  resetData,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { switchCompletedFilter } = useSwitchCompletedFilter();

  const expirationDate = todo.endDate
    ? parse(todo.endDate, DATE_FORMAT, new Date())
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

  const handleDateChange = (date: Date) => {
    let selectedDate;

    if (isToday(date)) {
      selectedDate = new Date();
    } else {
      selectedDate = date ? setHours(setMinutes(date, 0), 0) : null;
    }

    const formattedDate = selectedDate ? format(selectedDate, DATE_FORMAT) : "";

    updateTodo({
      endDate: formattedDate,
    });
  };

  const handleSave = () => {
    if (isValid(modalTitle)) {
      const newTodo = {
        id: editItem ? editItem.id : getUniqueId(),
        title: modalTitle,
        startDate: todo.startDate,
        endDate: todo.endDate,
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

  // preventing data entry from the keyboard
  const handleRawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
            value={todo.startDate}
            readOnly
          />
          <label className="modal__label">Expiration date</label>
          <DatePicker
            className="modal__input"
            showIcon
            selected={expirationDate}
            onChange={handleDateChange}
            timeFormat={TIME_FORMAT}
            dateFormat={DATE_FORMAT}
            timeIntervals={TIME_INTERVAL}
            placeholderText="Select expiration date"
            showTimeSelect
            minDate={new Date()}
            minTime={getMinDate(expirationDate)}
            onChangeRaw={handleRawChange}
            maxTime={getMaxDate(new Date())}
            required
          />
          <div className="modal__buttons">
            <CustomButton variant="secondary" onClick={handleModalClose}>
              Cancel
            </CustomButton>
            <CustomButton variant="primary" type="submit">
              Save
            </CustomButton>
          </div>
          {modalValidationMessage && (
            <p className="validation-message">{modalValidationMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};
