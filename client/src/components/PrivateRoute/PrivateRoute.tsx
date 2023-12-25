import { FC, PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ROUTE_PATHS } from "@/consts/routePaths";

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to={ROUTE_PATHS.SIGN_IN} replace />;
  }

  return <>{children}</>;
};
