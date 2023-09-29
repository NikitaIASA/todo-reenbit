import { FC } from "react";

import "./TodoInput.scss";

interface TodoInputProps {
  title: string;
  setTitle: (title: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const TodoInput: FC<TodoInputProps> = ({
  title,
  setTitle,
  handleKeyDown,
}) => {

  return (
    <input
      className="todo-input"
      type="text"
      placeholder="Add new task"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={handleKeyDown}
      maxLength={75}
    />
  );
};
