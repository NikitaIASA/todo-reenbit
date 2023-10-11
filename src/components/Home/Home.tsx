import { FC } from "react";

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
import { getCurrentDate } from "@/helpers/getDate";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ITodoItem } from "@/types/todoItemDto";
import { useSearch } from "@/hooks/useSearch";
import { useModal } from "@/hooks/useModal";
import { useTodoContext } from "@/context/TodoContext";

import "./Home.scss";

export const Home: FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { query, setQuery } = useSearch();
  const {
    title,
    setModalTitle,
    setStartDate,
    setEndDate,
    validationMessage,
    setEditItem,
  } = useTodoContext();

  const todoItems = useAppSelector(selectTodoItems);

  const handleModalOpen = () => {
    setEditItem(null);
    openModal();
    setModalTitle(title);
    setStartDate(getCurrentDate());
    setEndDate("");
  };

  const handleOpenEditModal = (item: ITodoItem) => {
    setEditItem(item);
    openModal();
    setModalTitle(item.title);
    setEndDate(item.endDate);
    setStartDate(item.startDate);
  };

  return (
    <Container>
      <ThemeSwitcher />
      <Header />
      <main className="main">
        <div className="enter-block">
          <div className="input-container">
            <TodoInput />
            <AddTodoButton onAddTodoButtonClick={handleModalOpen} />
          </div>
          {validationMessage && (
            <p className="validation-message">{validationMessage}</p>
          )}
          <SearchInput value={query} onChange={setQuery} />
          <FilterButtons />
        </div>
        <ToDoDashboard
          searchQuery={query}
          items={todoItems}
          handleOpenEditModal={handleOpenEditModal}
        />
      </main>
      {isModalOpen && <AddTodoModal onClose={closeModal} />}
    </Container>
  );
};
