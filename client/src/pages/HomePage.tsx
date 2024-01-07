import { FC, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchUserTasks } from "@/redux/thunks/tasksThunks";
import Home from "@/components/Home";

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    dispatch(fetchUserTasks(searchQuery));
  }, [searchQuery, dispatch]);

  const handleSearchChange = useCallback(
    (searchValue: string) => {
      const newSearchParams = new URLSearchParams();
      if (searchValue) {
        newSearchParams.set("search", searchValue);
      }
      setSearchParams(newSearchParams);
    },
    [setSearchParams]
  );

  return <Home searchQuery={searchQuery} onSearchChange={handleSearchChange} />;
};
