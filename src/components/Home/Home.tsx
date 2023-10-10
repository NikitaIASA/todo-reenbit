import { FC, useState } from "react";

import Container from "../Container";
import Header from "../Header";
import TodoInput from "../TodoInput";
import ToDoDashboard from "../TodoDashboard";
import AddTodoButton from "../AddTodoButton";
import AddTodoModal from "../AddTodoModal";
import FilterButtons from "../FilterButtons";
import SearchInput from "../SearchInput";
import ThemeSwitcher from "../ThemeSwitcher";
import { selectTodoItems } from "@/redux/selectors/todoSelectors";
import { getCurrentDate, getEndDate } from "@/helpers/getDate";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getUniqueId } from "@/helpers/getUniqueId";
import { isValid } from "@/helpers/isValid";
import { addTodo, editTodo } from "@/redux/actions/todoActions";
import { ITodoItem } from "@/types/todoItemDto";
import { setFilter } from "@/redux/actions/filterActions";
import { selectCompletedTodos } from "@/redux/selectors/todoSelectors";
import { selectFilter } from "@/redux/selectors/filterSelectors";
import { FILTER_OPTIONS } from "@/consts/filterOptions";
import { useSearch } from "@/hooks/useSearch";
import { useModal } from "@/hooks/useModal";

import "./Home.scss";

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { query, setQuery } = useSearch();

  const [validationMessage, setValidationMessage] = useState("");
  const [modalValidationMessage, setModalValidationMessage] = useState("");
  const [title, setTitle] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getEndDate());
  const [editItem, setEditItem] = useState<ITodoItem | null>(null);

  const todoItems = useAppSelector(selectTodoItems);
  const completedTasks = useAppSelector(selectCompletedTodos);
  const currentFilter = useAppSelector(selectFilter);

  const checkAndSwitchFilter = () => {
    if (currentFilter === FILTER_OPTIONS.COMPLETED && !completedTasks.length) {
      dispatch(setFilter(FILTER_OPTIONS.ALL));
    }
  };

  const resetData = () => {
    setTitle("");
    setStartDate(getCurrentDate());
    setEndDate(getEndDate());
    setValidationMessage("");
    setModalValidationMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && title.trim()) {
      if (isValid(title)) {
        dispatch(
          addTodo({ id: getUniqueId(), title, startDate, endDate, done: false })
        );
        checkAndSwitchFilter();
        resetData();
      } else {
        setValidationMessage("No special symbols allowed");
      }
    }
  };

  const handleSave = () => {
    if (isValid(modalTitle)) {
      const newTodo = {
        id: editItem ? editItem.id : getUniqueId(),
        title: modalTitle,
        startDate,
        endDate,
        done: false,
      };
      if (editItem) {
        dispatch(editTodo(newTodo));
      } else {
        dispatch(addTodo(newTodo));
      }
      checkAndSwitchFilter();
      openModal();
      resetData();
    } else {
      setModalValidationMessage("No special symbols allowed");
    }
  };

  const handleModalOpen = () => {
    setEditItem(null);
    openModal();
    setModalTitle(title);
    setStartDate(getCurrentDate());
    setEndDate("");
  };

  const handleModalClose = () => {
    closeModal();
    resetData();
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
      <ThemeSwitcher/>
      <Header />
      <main className="main">
        <div className="enter-block">
          <div className="input-container">
            <TodoInput
              title={title}
              setTitle={setTitle}
              handleKeyDown={handleKeyDown}
            />
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
      {isModalOpen && (
        <AddTodoModal
          title={modalTitle}
          endDate={endDate}
          startDate={startDate}
          validationMessage={modalValidationMessage}
          setTitle={setModalTitle}
          setEndDate={setEndDate}
          setValidationMessage={setModalValidationMessage}
          onClose={handleModalClose}
          onSave={handleSave}
          isEditMode={!!editItem}
        />
      )}
    </Container>
  );
};
