import {
  FC,
  MouseEvent,
  KeyboardEvent,
  FormEvent,
  ChangeEvent,
  useState,
} from "react";
import { format, parse, isToday, addMinutes } from "date-fns";
import DatePicker from "react-datepicker";

import CustomButton from "@/components/UI/CustomButton";
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
import { ERROR_MESSAGES } from "@/consts/Messages";
import { KEYS } from "@/consts/keys";
import { ButtonTypes, ButtonVariants } from "@/types/buttonTypes";

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

  const [isTodayDateSet, setIsTodayDateSet] = useState<boolean>(false);

  const handleDateChange = (selectedDate: Date | null) => {
    
    if (selectedDate && isToday(selectedDate) && !isTodayDateSet) {
      selectedDate = addMinutes(new Date(), 5); // Setting the current time + 5min only on the first click on today's date
      setIsTodayDateSet(true);
    } 

    if (selectedDate) {
      const formattedDate = format(selectedDate, DATE_FORMAT);
      updateTodo({
        endDate: formattedDate,
      });
    } else {
      updateTodo({
        endDate: "",
      });
    }
  };

  const expirationDate = todo.endDate
    ? parse(todo.endDate, DATE_FORMAT, new Date())
    : null;

  // Prevent click propagation within the modal (to close modal when user clicks outside it)
  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const preventKeyDownSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (modalTitle.trim()) {
      handleSave();
    } else {
      setModalValidationMessage(ERROR_MESSAGES.EMPTY_TITLE);
    }
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
      setModalValidationMessage(ERROR_MESSAGES.INVALID_SYMBOLS);
    }
  };

  const handleModalClose = () => {
    onClose();
    resetData();
  };

  // preventing data entry from the keyboard
  const handleRawChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            <CustomButton variant={ButtonVariants.SECONDARY} onClick={handleModalClose}>
              Cancel
            </CustomButton>
            <CustomButton variant={ButtonVariants.PRIMARY} type={ButtonTypes.SUBMIT}>
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
