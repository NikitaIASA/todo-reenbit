import { FC } from "react";

import ConfirmationModal from "../ConfirmationModal";
import CustomButton from "../UI/CustomButton";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { FILTER_TYPES } from "@/consts/filterOptions";
import {
  deleteCompletedTasks,
} from "@/redux/thunks/tasksThunks";
import { selectCompletedTodos, selectFilter } from "@/redux/selectors/todoSelectors";
import { useModal } from "@/hooks/useModal";
import { CONFIRMATION_MESSAGES } from "@/consts/Messages";
import { ButtonVariants } from "@/types/buttonTypes";
import { setFilter } from "@/redux/actions/todoActions";

import "./FilterButtons.scss";

export const FilterButtons: FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilter)

  const handleFilterChange = (filterValue: string) => {
    dispatch(setFilter(filterValue));
  };

  const { isModalOpen, openModal, closeModal } = useModal();
  const completedTasks = useAppSelector(selectCompletedTodos);
  
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
            isDisabled={!completedTasks.length}
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
