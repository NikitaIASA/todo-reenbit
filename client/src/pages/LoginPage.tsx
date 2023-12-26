import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/Login";
import { ROUTE_PATHS } from "@/consts/routePaths";

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTE_PATHS.HOME);
    }
  }, [isAuth, navigate]);

  return <LoginForm />;
};
