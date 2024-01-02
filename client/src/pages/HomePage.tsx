import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchUserTasks } from "@/redux/thunks/tasksThunks";
import { SEARCH_PARAM_KEYS, TASK_FILTER_VALUES } from "@/consts/searchParams";
import Home from "@/components/Home";

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get(SEARCH_PARAM_KEYS.SEARCH) || "";
  const currentFilter = searchParams.get(SEARCH_PARAM_KEYS.FILTER) || TASK_FILTER_VALUES.ALL;

  useEffect(() => {
    dispatch(fetchUserTasks(searchQuery, currentFilter));
  }, [searchQuery, currentFilter, dispatch]);

  const handleSearchChange = (searchValue: string) => {
    if (searchValue) {
      searchParams.set(SEARCH_PARAM_KEYS.SEARCH, searchValue);
    } else {
      searchParams.delete(SEARCH_PARAM_KEYS.SEARCH);
    }

    setSearchParams(searchParams);
  };

  const handleFilterChange = (filterValue: string) => {
    if (filterValue === TASK_FILTER_VALUES.ALL) {
      searchParams.delete(SEARCH_PARAM_KEYS.FILTER);
    } else {
      searchParams.set(SEARCH_PARAM_KEYS.FILTER, filterValue);
    }
  
    setSearchParams(searchParams);
  };
  
  return (
    <Home
      searchQuery={searchQuery}
      currentFilter={currentFilter}
      onSearchChange={handleSearchChange}
      onFilterChange={handleFilterChange}
    />
  );
};
