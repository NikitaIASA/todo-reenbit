import { FC, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchUserTasks } from "@/redux/thunks/tasks.thunks";
import Home from "@/components/Home";
import {
  selectFilter,
  selectSearchQuery,
} from "@/redux/selectors/todoSelectors";

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);
  const currentFilter = useAppSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchUserTasks({ search: searchQuery, status: currentFilter }));
  }, [searchQuery, currentFilter, dispatch]);

  return <Home />;
};
