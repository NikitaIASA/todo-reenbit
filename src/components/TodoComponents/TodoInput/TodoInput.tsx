import { FC } from "react";

import { TodoType } from "@/types/todoItemDto";
import { MAX_INPUT_LENGTH } from "@/consts/inputLength";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSwitchCompletedFilter } from "@/hooks/useCompletedSwitch";
import { addTodo } from "@/redux/actions/todoActions";
import { getUniqueId } from "@/helpers/getUniqueId";
import { isValid } from "@/helpers/isValid";

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todo.title.trim()) {
      if (isValid(todo.title)) {
        dispatch(
          addTodo({
            id: getUniqueId(),
            title: todo.title,
            startDate: todo.startDate,
            endDate: todo.endDate,
            done: false,
          })
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
      value={todo.title}
      onChange={(e) => updateTodo({ title: e.target.value })}
      onKeyDown={handleKeyDown}
      maxLength={MAX_INPUT_LENGTH}
    />
  );
};
