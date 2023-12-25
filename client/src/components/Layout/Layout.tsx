import { FC } from "react";
import { Outlet } from "react-router-dom";

import Container from "@/components/Container";
import Header from "@/components/Header";
import ThemeSwitcher from "@/components/ThemeSwitcher";

import "./Layout.scss";

export const Layout: FC = () => {
  return (
    <Container>
      <ThemeSwitcher />
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </Container>
  );
};
