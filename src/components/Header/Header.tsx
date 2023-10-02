import { FC } from "react";

import logo from "@/assets/images/logo.svg";

import "./Header.scss";

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="title">
        <img className="title__logo" src={logo} alt="Reenbit logo" />
        <h1 className="title__text">Daily Planner</h1>
      </div>
    </header>
  );
};
