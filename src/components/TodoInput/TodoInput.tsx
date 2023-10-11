import { FC } from "react";
import { isValid } from "@/helpers/isValid";

import { MAX_INPUT_LENGTH } from "@/consts/inputLength";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addTodo } from "@/redux/actions/todoActions";
import { getUniqueId } from "@/helpers/getUniqueId";
import { useTodoContext } from "@/context/TodoContext";
import { useSwitchCompletedFilter } from "@/hooks/useCompletedSwitch";

import "./TodoInput.scss";

export const TodoInput: FC = () => {
  const dispatch = useAppDispatch();
  const {
    title,
    setTitle,
    startDate,
    endDate,
    setValidationMessage,
    resetData,
  } = useTodoContext();
  const { switchCompletedFilter } = useSwitchCompletedFilter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && title.trim()) {
      if (isValid(title)) {
        dispatch(
          addTodo({ id: getUniqueId(), title, startDate, endDate, done: false })
        );
        switchCompletedFilter();
        resetData();
      } else {
        setValidationMessage("No special symbols allowed");
      }
    }
  };

  return (
    <input
      className="todo-input"
      type="text"
      placeholder="Add new task..."
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={handleKeyDown}
      maxLength={MAX_INPUT_LENGTH}
    />
  );
};
