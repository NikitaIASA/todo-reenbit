import { FC, useState } from "react";
import LoginForm from "@/components/Auth/LoginForm";
import RegistrationForm from "@/components/Auth/RegistrationForm";

import "./Auth.scss";

const TABS = {
  LOGIN: "login",
  REGISTER: "register",
};

export const Auth: FC = () => {
  const [activeTab, setActiveTab] = useState(TABS.LOGIN);

  return (
    <div className="auth">
      <div className="auth__tab-buttons">
        <button
          className={`auth__button ${
            activeTab === TABS.LOGIN ? "active" : ""
          }`}
          onClick={() => setActiveTab(TABS.LOGIN)}
        >
          Sign in
        </button>
        <button
          className={`auth__button ${
            activeTab === TABS.REGISTER ? "active" : ""
          }`}
          onClick={() => setActiveTab(TABS.REGISTER)}
        >
          Sign up
        </button>
      </div>
      {activeTab === TABS.LOGIN ? <LoginForm /> : <RegistrationForm />}
    </div>
  );
};
