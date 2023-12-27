import { FC, useEffect } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchUserTasks } from "@/redux/thunks/tasksThunks";
import Home from "@/components/Home";

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserTasks());
  }, [dispatch]);

  return <Home />;
};
