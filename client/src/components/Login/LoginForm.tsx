import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ButtonTypes } from "@/types/buttonTypes";
import { signInSchema } from "@/schemas/authSchemas";
import { ILoginForm } from "@/types/authTypes";
import { login } from "@/redux/thunks/auth";
import CustomButton from "@/components/UI/CustomButton";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectAuthError } from "@/redux/selectors/authSelectors";
import { ROUTE_PATHS } from "@/consts/routePaths";
import { AUTH_INPUT_FIELDS } from "@/consts/authInputs";

import "./Login.scss";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(signInSchema),
  });
  
  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    await dispatch(login(data.email, data.password));
    navigate(ROUTE_PATHS.HOME);
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Sign in</h2>
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
          <CustomButton type={ButtonTypes.SUBMIT}>Login</CustomButton>
          {authError && <p className="login__error">{authError}</p>}
        </form>
      </div>
    </div>
  );
};
