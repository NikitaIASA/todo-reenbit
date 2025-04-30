import { FC } from "react";

import ConfirmationModal from "../ConfirmationModal";
import CustomButton from "../UI/CustomButton";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { FILTER_TYPES } from "@/consts/filterOptions";
import {
  deleteCompletedTasks,
} from "@/redux/thunks/tasks.thunks";
import { selectCompletedCount, selectFilter } from "@/redux/selectors/tasks.selectors";
import { useModal } from "@/hooks/useModal";
import { CONFIRMATION_MESSAGES } from "@/consts/Messages";
import { ButtonVariants } from "@/types/buttonTypes";

import "./FilterButtons.scss";
import { setFilter } from "@/redux/reducers/tasks.reducer";

export const FilterButtons: FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilter)

  const handleFilterChange = (filterValue: string) => {
    dispatch(setFilter(filterValue));
  };

  const { isModalOpen, openModal, closeModal } = useModal();
  const completedTasksCount = useAppSelector(selectCompletedCount);
  
  const handleConfirmDelete = () => {
    dispatch(deleteCompletedTasks());
    closeModal();
  };

  return (
    <>
      <div className="filter-container">
        <div className="filter-buttons">
          {FILTER_TYPES.map(({ key, label }) => (
            <CustomButton
              key={key}
              variant={ButtonVariants.PRIMARY}
              onClick={() => handleFilterChange(key)}
              isDisabled={currentFilter === key}
            >
              {label}
            </CustomButton>
          ))}
        </div>
        <div className="clear-buttons">
          <CustomButton
            onClick={openModal}
            variant={ButtonVariants.SECONDARY}
            isDisabled={!completedTasksCount}
          >
            Clear сompleted
          </CustomButton>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          message={CONFIRMATION_MESSAGES.DELETE_ALL_COMPLETED}
          onConfirm={handleConfirmDelete}
          onClose={closeModal}
        />
      )}
    </>
  );
};
