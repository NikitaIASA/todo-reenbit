import { FC } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectFilter } from "@/redux/selectors/filterSelectors";
import { setFilter } from "@/redux/actions/filterActions";
import { FILTER_TYPES } from "@/consts/filterTypes";

import "./FilterButtons.scss";

export const FilterButtons: FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilter);

  const handleFilterClick = (filterType: string) => {
    dispatch(setFilter(filterType));
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
    </div>
  );
};
