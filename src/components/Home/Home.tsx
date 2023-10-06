import { FC, useState, useEffect } from "react";

import Container from "../Container";
import Header from "../Header";
import TodoInput from "../TodoInput";
import ToDoDashboard from "../TodoDashboard";
import AddTodoButton from "../AddTodoButton";
import AddTodoModal from "../AddTodoModal";
import FilterButtons from "../FilterButtons";
import { selectTodoItems } from "@/redux/selectors/todoSelectors";
import { getCurrentDate, getEndDate } from "@/helpers/getDate";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getUniqueId } from "@/helpers/getUniqueId";
import { isValid } from "@/helpers/isValid";
import { addTodo, editTodo } from "@/redux/actions/todoActions";
import { ITodoItem } from "@/types/todoItemDto";

import "./Home.scss";

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [modalValidationMessage, setModalValidationMessage] = useState("");
  const [title, setTitle] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getEndDate());
  const [editItem, setEditItem] = useState<ITodoItem | null>(null);

  const todoItems = useAppSelector(selectTodoItems);

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
      setIsOpenModal(false);
      resetData();
    } else {
      setModalValidationMessage("No special symbols allowed");
    }
  };

  const handleModalOpen = () => {
    setEditItem(null);
    setIsOpenModal(true);
    setModalTitle(title);
    setStartDate(getCurrentDate());
    setEndDate("");
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
    resetData();
  };

  const handleOpenEditModal = (item: ITodoItem) => {
    setEditItem(item);
    setIsOpenModal(true);
    setModalTitle(item.title);
    setEndDate(item.endDate);
    setStartDate(item.startDate);
  };

  // Prevent page scrolling while the modal is open.
  useEffect(() => {
    isOpenModal && document.body.classList.add("modal-open");
    !isOpenModal && document.body.classList.remove("modal-open");
  }, [isOpenModal]);

  return (
    <Container>
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
        </div>
        <FilterButtons />
        <ToDoDashboard
          items={todoItems}
          handleOpenEditModal={handleOpenEditModal}
        />
      </main>
      {isOpenModal && (
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
