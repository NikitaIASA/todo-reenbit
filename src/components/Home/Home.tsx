import { FC, useState } from "react";
import { useSelector } from "react-redux";

import Container from "../Container";
import Header from "../Header";
import TodoInput from "../TodoInput";
import ToDoDashboard from "../TodoDashboard";
import AddTodoButton from "../AddTodoButton";
import AddTodoModal from "../AddTodoModal";
import { selectTodoItems } from "@/redux/selectors/todoSelectors";
import { getCurrentDate, getEndDate } from "@/helpers/getDate";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getUniqueId } from "@/helpers/getUniqueId";
import { addTodo } from "@/redux/actions/todoAction";

import "./Home.scss";

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getEndDate());
  const todoItems = useSelector(selectTodoItems);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && title.trim() !== "") {
      dispatch(addTodo({ id: getUniqueId(), title, startDate, endDate }));
      setTitle("");
      setStartDate(getCurrentDate())
      setEndDate(getEndDate());
    }
  };

  const handleSave = () => {
    dispatch(addTodo({ id: getUniqueId(), title, startDate, endDate }));
    setIsOpenModal(false);
    setTitle("");
  };

  return (
    <Container>
      <Header />
      <main className="main">
        <div className="input-container">
          <TodoInput
            title={title}
            setTitle={setTitle}
            handleKeyDown={handleKeyDown}
          />
          <AddTodoButton onAddTodoButtonClick={() => setIsOpenModal(true)} />
        </div>
        <ToDoDashboard items={todoItems} />
      </main>
      {isOpenModal && (
        <AddTodoModal
          title={title}
          setTitle={setTitle}
          setEndDate={setEndDate}
          onClose={() => setIsOpenModal(false)}
          onSave={handleSave}
        />
      )}
    </Container>
  );
};
