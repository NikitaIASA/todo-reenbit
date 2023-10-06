import { FC } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectFilter } from "@/redux/selectors/filterSelectors";
import { setFilter } from "@/redux/actions/filterActions";
import { FILTER_TYPES } from "@/consts/filterTypes";
import { deleteCompletedTodos } from "@/redux/actions/todoActions";
import { selectCompletedTodos } from "@/redux/selectors/todoSelectors";

import "./FilterButtons.scss";

export const FilterButtons: FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilter);
  const completedTasks = useAppSelector(selectCompletedTodos);

  const handleFilterClick = (filterType: string) => {
    dispatch(setFilter(filterType));
  };

  const handleDeleteCompleted = () => {
    if (
      window.confirm(
        "Are you sure that you want to delete all completed tasks?"
      )
    ) {
      dispatch(dispatch(deleteCompletedTodos()));
    }
  };

  return (
    <div className="filter-buttons">
      {FILTER_TYPES.map(({ key, label }) => (
        <button
          className="filter-buttons__item"
          key={key}
          onClick={() => handleFilterClick(key)}
          disabled={currentFilter === key}
        >
          {label}
        </button>
      ))}
      <button className="filter-buttons__item clear-completed" onClick={handleDeleteCompleted} disabled={!completedTasks.length}>
        Clear сompleted
      </button>
    </div>
  );
};
