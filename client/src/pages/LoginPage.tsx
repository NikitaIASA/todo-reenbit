import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { ROUTE_PATHS } from "@/consts/routePaths";
import { Auth } from "@/components/Auth/Auth";

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTE_PATHS.HOME);
    }
  }, [isAuth, navigate]);

  return <Auth/>
};
