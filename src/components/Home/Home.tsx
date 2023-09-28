import { FC } from "react";
import { useSelector } from "react-redux";

import Container from "../Container";
import Header from "../Header";
import TodoInput from "../TodoInput";
import ToDoDashboard from "../TodoDashboard";
import AddTodoButton from "../AddTodoButton";
import { selectTodoItems } from "@/redux/selectors/todoSelectors";

import "./Home.scss";

function test() {
  alert("hello world");
}

export const Home: FC = () => {
  const todoItems = useSelector(selectTodoItems);

  return (
    <Container>
      <Header />
      <main className="main">
        <div className="input-container">
          <TodoInput />
          <AddTodoButton onAddTodoButtonClick={test} />
        </div>
        <ToDoDashboard items={todoItems} />
      </main>
    </Container>
  );
};
