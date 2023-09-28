import { FC } from "react";

import Container from "../Container";
import Header from "../Header";
import TodoInput from "../TodoInput";
import ToDoDashboard from "../TodoDashboard";
import { dummyData } from "./dummyData";

import "./Home.scss";

export const Home: FC = () => {
  return (
    <Container>
      <Header />
      <main className="main">
        <TodoInput />
        <ToDoDashboard items={dummyData} />
      </main>
    </Container>
  );
};
