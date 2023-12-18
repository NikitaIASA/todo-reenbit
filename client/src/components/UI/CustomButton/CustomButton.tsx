import { FC, ReactNode } from "react";
import clsx from "clsx";

import { ButtonVariants, ButtonTypes } from "@/types/buttonTypes";

import "./CustomButton.scss";

interface CustomButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  variant?: ButtonVariants;
  type?: ButtonTypes;
  className?: string;
  onClick?: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({
  children,
  isDisabled = false,
  variant = ButtonVariants.PRIMARY,
  className,
  type = ButtonTypes.BUTTON,
  onClick,
}) => {
  const buttonClass = clsx("custom-button", {
    "custom-button--disabled": isDisabled,
    "custom-button--primary": variant === ButtonVariants.PRIMARY,
    "custom-button--secondary": variant === ButtonVariants.SECONDARY,
    [className!]: className,
  });

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
    >
      {children}
    </button>
  );
};
