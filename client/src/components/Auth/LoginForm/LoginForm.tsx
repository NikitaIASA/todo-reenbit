import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ButtonTypes } from "@/types/buttonTypes";
import { signInSchema } from "@/schemas/authSchemas";
import { ILoginForm } from "@/types/authTypes";
import { login } from "@/redux/thunks/auth.thunks";
import CustomButton from "@/components/UI/CustomButton";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  selectAuthError,
  selectAuthStatus,
} from "@/redux/selectors/auth.selectors";
import { ROUTE_PATHS } from "@/consts/routePaths";
import { AUTH_INPUT_FIELDS } from "@/consts/authInputs";

import "./Login.scss";
import { LoadingStatus } from "@/types/loading-status";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);
  const status = useAppSelector(selectAuthStatus);
  const isLoading = status === LoadingStatus.PENDING;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    await dispatch(login(data));
    navigate(ROUTE_PATHS.HOME);
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Log in to your account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login__input-container">
            <input
              className="login__input"
              {...register(AUTH_INPUT_FIELDS.email.name)}
              placeholder={AUTH_INPUT_FIELDS.email.placeholder}
            />
            <p className="login__error">{errors.email?.message}</p>
          </div>
          <div className="login__input-container">
            <input
              className="login__input"
              type={AUTH_INPUT_FIELDS.password.type}
              {...register(AUTH_INPUT_FIELDS.password.name)}
              placeholder={AUTH_INPUT_FIELDS.password.placeholder}
            />
            <p className="login__error">{errors.password?.message}</p>
          </div>
          <CustomButton type={ButtonTypes.SUBMIT} isDisabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </CustomButton>
          {authError && <p className="login__error">{authError}</p>}
        </form>
      </div>
    </div>
  );
};
