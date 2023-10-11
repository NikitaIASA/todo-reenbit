import { FC } from "react";

import CustomButton from "../CustomButton";

import "./ConfirmationModal.scss";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onClose,
}) => {
  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <p className="confirm-modal__message">{message}</p>
        <div className="confirm-modal__buttons">
          <CustomButton variant="primary" onClick={onConfirm}>
            Confirm
          </CustomButton>
          <CustomButton variant="secondary" onClick={onClose}>
            Cancel
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
