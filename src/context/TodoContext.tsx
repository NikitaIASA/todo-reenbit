import React, { createContext, useContext, useState, FC } from "react";
import { ITodoItem } from "@/types/todoItemDto";
import { getCurrentDate } from "@/helpers/getDate";
import { getEndDate } from "@/helpers/getDate";

interface ITodoContext {
  title: string;
  setTitle: (value: string) => void;
  modalTitle: string;
  setModalTitle: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  validationMessage: string;
  setValidationMessage: (value: string) => void;
  modalValidationMessage: string;
  setModalValidationMessage: (value: string) => void;
  editItem: ITodoItem | null;
  setEditItem: (item: ITodoItem | null) => void;
  resetData: () => void;
}

const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [validationMessage, setValidationMessage] = useState("");
  const [modalValidationMessage, setModalValidationMessage] = useState("");
  const [title, setTitle] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getEndDate());
  const [editItem, setEditItem] = useState<ITodoItem | null>(null);

  const resetData = () => {
    setTitle("");
    setStartDate(getCurrentDate());
    setEndDate(getEndDate());
    setValidationMessage("");
    setModalValidationMessage("");
  };

  return (
    <TodoContext.Provider
      value={{
        title,
        setTitle,
        modalTitle,
        setModalTitle,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        validationMessage,
        setValidationMessage,
        modalValidationMessage,
        setModalValidationMessage,
        editItem,
        setEditItem,
        resetData
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
