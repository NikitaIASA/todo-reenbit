import { FC } from "react";

import Container from "../Container";
import Header from "../Header";
import TodoInput from "../TodoInput";

import "./Home.scss";

export const Home: FC = () => {
  return (
    <Container>
      <Header />
      <main className="main">
        <TodoInput />
      </main>
    </Container>
  );
};
