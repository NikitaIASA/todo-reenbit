import { actionTypes } from "./actionTypes";

export interface IUser {
    token: string;
    userId: string;
}

export interface IUserReg {
    username: string;
    email: string;
    token: string;
    refreshToken: string;
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

export interface RegisterRequestAction {
    type: typeof actionTypes.REGISTER_REQUEST;
}

export interface RegisterSuccessAction {
    type: typeof actionTypes.REGISTER_SUCCESS;
    payload: IUserReg;
}

export interface RegisterFailureAction {
    type: typeof actionTypes.REGISTER_FAILURE;
    payload: string;
}

export type IAuthActionList = RegisterRequestAction | RegisterSuccessAction | RegisterFailureAction | ILoginSuccessAction | ILoginFailureAction | ILoginRequestAction | ILogoutSuccessAction;
