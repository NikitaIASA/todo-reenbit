import { actionTypes } from "./actionTypes";

export interface IUser {
    token: string;
    userId: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
  }

export interface ILoginSuccessAction {
    type: typeof actionTypes.LOGIN_SUCCESS;
    payload: IUser;
}

export interface ILoginFailureAction {
    type: typeof actionTypes.LOGIN_FAILURE;
    payload: string;
}

export interface ILoginRequestAction {
    type: typeof actionTypes.LOGIN_REQUEST;
}

export interface ILogoutSuccessAction {
    type: typeof actionTypes.LOGOUT_SUCCESS
}

export type IAuthActionList = ILoginSuccessAction | ILoginFailureAction | ILoginRequestAction | ILogoutSuccessAction;
