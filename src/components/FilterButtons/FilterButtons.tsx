import { FC } from "react";

import ConfirmationModal from "../ConfirmationModal";
import CustomButton from "../UI/CustomButton";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectFilter } from "@/redux/selectors/filterSelectors";
import { setFilter } from "@/redux/actions/filterActions";
import { FILTER_TYPES } from "@/consts/filterOptions";
import { deleteCompletedTodos } from "@/redux/actions/todoActions";
import { selectCompletedTodos } from "@/redux/selectors/todoSelectors";
import { useModal } from "@/hooks/useModal";
import { CONFIRMATION_MESSAGES } from "@/consts/Messages";
import { ButtonVariants } from "@/types/buttonTypes";

import "./FilterButtons.scss";

export const FilterButtons: FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();

  const currentFilter = useAppSelector(selectFilter);
  const completedTasks = useAppSelector(selectCompletedTodos);

  const handleFilterClick = (filterType: string) => {
    dispatch(setFilter(filterType));
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCompletedTodos());
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
              onClick={() => handleFilterClick(key)}
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
