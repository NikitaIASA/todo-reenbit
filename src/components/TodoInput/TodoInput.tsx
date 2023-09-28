import { FC } from "react";

import "./TodoInput.scss";

interface TodoInputProps {}

export const TodoInput: FC<TodoInputProps> = () => {
  return <input className="todo-input" type="text" placeholder="Add new task" />;
};
