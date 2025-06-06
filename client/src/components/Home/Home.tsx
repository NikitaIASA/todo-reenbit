import { FC, useState } from "react";

import TodoInput from "../TodoComponents/TodoInput";
import ToDoDashboard from "../TodoComponents/TodoDashboard";
import AddTodoButton from "../TodoComponents/AddTodoButton";
import AddTodoModal from "../TodoComponents/AddTodoModal";
import FilterButtons from "../FilterButtons";
import SearchInput from "../SearchInput";
import { selectTodoItems } from "@/redux/selectors/tasks.selectors";
import { getCurrentDateISO, getEndDateISO } from "@/helpers/getDate";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ITodoItem } from "@/core/api/todo-list/tasks/dto/task.dto";
import { useModal } from "@/hooks/useModal";
import { TodoType } from "@/core/api/todo-list/tasks/dto/task.dto";

import "./Home.scss";

export const Home: FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [todo, setTodo] = useState<TodoType>({
    title: "",
    createdDate: getCurrentDateISO(),
    expiredDate: getEndDateISO(),
  });
  const [modalTitle, setModalTitle] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [modalValidationMessage, setModalValidationMessage] = useState("");
  const [editItem, setEditItem] = useState<ITodoItem | null>(null);
  const todoItems = useAppSelector(selectTodoItems);

  const updateTodo = (updates: Partial<typeof todo>) => {
    setTodo((prevState) => ({ ...prevState, ...updates }));
  };

  const resetData = () => {
    updateTodo({
      title: "",
      createdDate: getCurrentDateISO(),
      expiredDate: getEndDateISO(),
    });
    setModalTitle("");
    setValidationMessage("");
    setModalValidationMessage("");
  };

  const handleModalOpen = () => {
    setEditItem(null);
    openModal();
    updateTodo({
      createdDate: getCurrentDateISO(),
      expiredDate: "",
    });
    setModalTitle(todo.title);
  };

  const handleOpenEditModal = (item: ITodoItem) => {
    setEditItem(item);
    openModal();
    updateTodo({
      createdDate: item.createdDate,
      expiredDate: item.expiredDate,
    });
    setModalTitle(item.title);
  };

  return (
    <>
      <div className="enter-block">
        <div className="input-container">
          <TodoInput
            todo={todo}
            updateTodo={updateTodo}
            setValidationMessage={setValidationMessage}
            resetData={resetData}
          />
          <AddTodoButton onAddTodoButtonClick={handleModalOpen} />
        </div>
        {validationMessage && (
          <p className="validation-message">{validationMessage}</p>
        )}
        <SearchInput/>
        <FilterButtons/>
      </div>
      <ToDoDashboard
        items={todoItems}
        handleOpenEditModal={handleOpenEditModal}
      />
      {isModalOpen && (
        <AddTodoModal
          onClose={closeModal}
          todo={todo}
          modalTitle={modalTitle}
          setModalTitle={setModalTitle}
          updateTodo={updateTodo}
          modalValidationMessage={modalValidationMessage}
          setModalValidationMessage={setModalValidationMessage}
          editItem={editItem}
          resetData={resetData}
        />
      )}
    </>
  );
};
