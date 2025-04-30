import { FC, KeyboardEvent } from "react";

import { TodoType } from "@/core/api/todo-list/tasks/dto/task.dto";
import { MAX_INPUT_LENGTH } from "@/consts/inputLength";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSwitchCompletedFilter } from "@/hooks/useCompletedSwitch";
import { isValid } from "@/helpers/isValid";
import { ERROR_MESSAGES } from "@/consts/Messages";
import { KEYS } from "@/consts/keys";
import { addUserTask } from "@/redux/thunks/tasks.thunks";

import "./TodoInput.scss";

interface TodoInputProps {
  todo: TodoType;
  updateTodo: (updates: Partial<TodoType>) => void;
  setValidationMessage: (message: string) => void;
  resetData: () => void;
}

export const TodoInput: FC<TodoInputProps> = ({
  todo,
  updateTodo,
  setValidationMessage,
  resetData,
}) => {
  const dispatch = useAppDispatch();
  const { switchCompletedFilter } = useSwitchCompletedFilter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYS.ENTER && todo.title.trim()) {
      if (isValid(todo.title)) {
        dispatch(
          addUserTask({
            title: todo.title.trim(),
            createdDate: todo.createdDate,
            expiredDate: todo.expiredDate,
          })
        )
        switchCompletedFilter();
        resetData();
      } else {
        setValidationMessage(ERROR_MESSAGES.INVALID_SYMBOLS);
      }
    }
  };

  return (
    <input
      className="todo-input"
      type="text"
      placeholder="Add new task..."
      value={todo.title}
      onChange={(e) => updateTodo({ title: e.target.value })}
      onKeyDown={handleKeyDown}
      maxLength={MAX_INPUT_LENGTH}
    />
  );
};
