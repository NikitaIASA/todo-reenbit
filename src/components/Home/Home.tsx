import { FC, useState } from "react";

import Container from "../Container";
import Header from "../Header";
import TodoInput from "../TodoComponents/TodoInput";
import ToDoDashboard from "../TodoComponents/TodoDashboard";
import AddTodoButton from "../TodoComponents/AddTodoButton";
import AddTodoModal from "../TodoComponents/AddTodoModal";
import FilterButtons from "../FilterButtons";
import SearchInput from "../SearchInput";
import ThemeSwitcher from "../ThemeSwitcher";
import { selectTodoItems } from "@/redux/selectors/todoSelectors";
import { getCurrentDate, getEndDate } from "@/helpers/getDate";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ITodoItem } from "@/types/todoItemDto";
import { useSearch } from "@/hooks/useSearch";
import { useModal } from "@/hooks/useModal";
import { TodoType } from "@/types/todoItemDto";

import "./Home.scss";

export const Home: FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { query, setQuery } = useSearch();
  const [todo, setTodo] = useState<TodoType>({
    title: "",
    modalTitle: "",
    startDate: getCurrentDate(),
    endDate: getEndDate(),
  });
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
      modalTitle: "",
      startDate: getCurrentDate(),
      endDate: getEndDate(),
    });
  };

  const handleModalOpen = () => {
    setEditItem(null);
    openModal();
    updateTodo({
      modalTitle: todo.title,
      startDate: getCurrentDate(),
      endDate: "",
    });
  };

  const handleOpenEditModal = (item: ITodoItem) => {
    setEditItem(item);
    openModal();
    updateTodo({
      modalTitle: item.title,
      startDate: item.startDate,
      endDate: item.endDate,
    });
  };

  return (
    <Container>
      <ThemeSwitcher />
      <Header />
      <main className="main">
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
          <SearchInput onChange={setQuery} />
          <FilterButtons />
        </div>
        <ToDoDashboard
          searchQuery={query}
          items={todoItems}
          handleOpenEditModal={handleOpenEditModal}
        />
      </main>
      {isModalOpen && (
        <AddTodoModal
          onClose={closeModal}
          todo={todo}
          updateTodo={updateTodo}
          modalValidationMessage={modalValidationMessage}
          setModalValidationMessage={setModalValidationMessage}
          editItem={editItem}
          resetData={resetData}
        />
      )}
    </Container>
  );
};
