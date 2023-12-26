import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import { routes } from "@/core/routes";
import Layout from "@/components/Layout";
import PrivateRoute from "./components/PrivateRoute";

export const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map((route) => {
            if (route.private) {
              return (
                <Route
                  key={`route-${route.path}`}
                  path={route.path}
                  element={
                    <PrivateRoute>
                      <route.Element />
                    </PrivateRoute>
                  }
                />
              );
            }
            return (
              <Route
                key={`route-${route.path}`}
                path={route.path}
                element={<route.Element />}
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
};
