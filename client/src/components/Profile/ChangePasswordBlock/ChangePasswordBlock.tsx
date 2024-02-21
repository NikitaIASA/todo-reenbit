import { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { changeUserPassword } from "@/redux/thunks/auth";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import CustomButton from "@/components/UI/CustomButton";
import { ButtonTypes } from "@/types/buttonTypes";
import { changePasswordSchema } from "@/schemas/authSchemas";

import "./ChangePasswordBlock.scss";
import { CHANGE_PASSWORD_FIELDS } from "@/consts/changePasswordForm";

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordBlock = () => {
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    const { currentPassword, newPassword } = data;
    try {
      await dispatch(changeUserPassword(currentPassword, newPassword));
      setMessage("Password successfully changed.");
      reset();
    } catch (error) {
      setMessage("Failed to change password. Please try again.");
    }
  };

  return (
    <form className="change-password" onSubmit={handleSubmit(onSubmit)}>
      <div className="change-password__input-container">
        <input
          className="change-password__input"
          type={CHANGE_PASSWORD_FIELDS.currentPassword.type}
          {...register(CHANGE_PASSWORD_FIELDS.currentPassword.name)}
          placeholder={CHANGE_PASSWORD_FIELDS.currentPassword.placeholder}
        />
        <p>{errors.currentPassword?.message}</p>
      </div>
      <div className="change-password__input-container">
        <input
          className="change-password__input"
          type={CHANGE_PASSWORD_FIELDS.newPassword.type}
          {...register(CHANGE_PASSWORD_FIELDS.newPassword.name)}
          placeholder={CHANGE_PASSWORD_FIELDS.newPassword.placeholder}
        />
        <p>{errors.newPassword?.message}</p>
      </div>
      <div className="change-password__input-container">
        <input
          className="change-password__input"
          type={CHANGE_PASSWORD_FIELDS.confirmPassword.type}
          {...register(CHANGE_PASSWORD_FIELDS.confirmPassword.name)}
          placeholder={CHANGE_PASSWORD_FIELDS.confirmPassword.placeholder}
        />
        <p>{errors.confirmPassword?.message}</p>
      </div>
      {message && <p>{message}</p>}
      <CustomButton className="myButton" type={ButtonTypes.SUBMIT}>
        Change password
      </CustomButton>
    </form>
  );
};
