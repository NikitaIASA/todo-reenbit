import { FC } from "react";
import Home from "@/components/Home";
import { useFetchUserTasks } from "@/hooks/use-fetch-user-tasks.hook";

export const HomePage: FC = () => {
  useFetchUserTasks();

  return <Home />;
};
