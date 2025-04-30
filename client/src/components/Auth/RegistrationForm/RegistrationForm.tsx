import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ButtonTypes } from "@/types/buttonTypes";
import CustomButton from "@/components/UI/CustomButton";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  selectAuthError,
  selectAuthStatus,
} from "@/redux/selectors/auth.selectors";
import { ROUTE_PATHS } from "@/consts/routePaths";
import { AUTH_INPUT_FIELDS } from "@/consts/authInputs";
import { registerUser } from "@/redux/thunks/auth.thunks";
import { signUpSchema } from "@/schemas/authSchemas";
import { IRegisterForm } from "@/types/authTypes";

import "./RegistrationForm.scss";
import { LoadingStatus } from "@/types/loading-status";

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);
  const status = useAppSelector(selectAuthStatus);
  const navigate = useNavigate();

  const isLoading = status === LoadingStatus.PENDING;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    await dispatch(registerUser(data));
    navigate(ROUTE_PATHS.HOME);
  };

  return (
    <div className="register">
      <div className="register__container">
        <h2 className="register__title">Create your account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="register__input-container">
            <input
              className="register__input"
              {...register(AUTH_INPUT_FIELDS.username.name)}
              placeholder={AUTH_INPUT_FIELDS.username.placeholder}
              type={AUTH_INPUT_FIELDS.username.type}
            />
            <p className="register__error">{errors.username?.message}</p>
          </div>
          <div className="register__input-container">
            <input
              className="register__input"
              {...register(AUTH_INPUT_FIELDS.email.name)}
              placeholder={AUTH_INPUT_FIELDS.email.placeholder}
              type={AUTH_INPUT_FIELDS.email.type}
            />
            <p className="register__error">{errors.email?.message}</p>
          </div>
          <div className="register__input-container">
            <input
              className="register__input"
              {...register(AUTH_INPUT_FIELDS.password.name)}
              placeholder={AUTH_INPUT_FIELDS.password.placeholder}
              type={AUTH_INPUT_FIELDS.password.type}
            />
            <p className="register__error">{errors.password?.message}</p>
          </div>
          <div className="register__input-container">
            <input
              className="register__input"
              {...register(AUTH_INPUT_FIELDS.confirmPassword.name)}
              placeholder={AUTH_INPUT_FIELDS.confirmPassword.placeholder}
              type={AUTH_INPUT_FIELDS.confirmPassword.type}
            />
            <p className="register__error">{errors.confirmPassword?.message}</p>
          </div>
          <CustomButton type={ButtonTypes.SUBMIT} isDisabled={isLoading}>
            {isLoading ? "Loading..." : "Sign Up"}
          </CustomButton>
          {authError && <p className="register__error">{authError}</p>}
        </form>
      </div>
    </div>
  );
};
