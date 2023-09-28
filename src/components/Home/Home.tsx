import { FC } from "react";
import { useSelector } from "react-redux"; 

import Container from "../Container";
import Header from "../Header";
import TodoInput from "../TodoInput";
import ToDoDashboard from "../TodoDashboard";
import { selectTodoItems } from "@/redux/selectors/todoSelectors";

import "./Home.scss";

export const Home: FC = () => {
  const todoItems = useSelector(selectTodoItems); 

  return (
    <Container>
      <Header />
      <main className="main">
        <TodoInput />
        <ToDoDashboard items={todoItems} />
      </main>
    </Container>
  );
};
