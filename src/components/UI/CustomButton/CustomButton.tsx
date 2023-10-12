import { FC, ReactNode } from "react";
import clsx from "clsx";

import "./CustomButton.scss";

interface CustomButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset"; 
  className?: string;
  onClick?: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({
  children,
  isDisabled = false,
  variant = "primary",
  className,
  type = "button",
  onClick,
}) => {
  const buttonClass = clsx("custom-button", {
    "custom-button--disabled": isDisabled,
    "custom-button--primary": variant === "primary",
    "custom-button--secondary": variant === "secondary",
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
