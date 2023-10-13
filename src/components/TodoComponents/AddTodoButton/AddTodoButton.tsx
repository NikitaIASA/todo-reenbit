import { FC } from "react";

import "./AddTodoButton.scss";

interface AddTodoButtonProps {
  onAddTodoButtonClick: () => void;
}

export const AddTodoButton: FC<AddTodoButtonProps> = ({
  onAddTodoButtonClick,
}) => {
  return (
    <button className="add-todo" onClick={onAddTodoButtonClick}>
      <span className="add-todo__plus">+</span>
    </button>
  );
};
