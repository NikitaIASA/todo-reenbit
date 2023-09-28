import React, { useState } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addTodo } from "@/redux/actions/todoAction";
import { getCurrentDate, getEndDate } from "@/helpers/getDate";

import "./TodoInput.scss";

export const TodoInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getEndDate());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(addTodo({ id: 5, title, startDate, endDate }));
      setTitle("");
      setStartDate(getCurrentDate());
      setEndDate(getEndDate());
    }
  };

  return (
    <input
      className="todo-input"
      type="text"
      placeholder="Add new task"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
