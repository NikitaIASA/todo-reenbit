import { actionTypes } from "./actionTypes";

export interface IUser {
    username: string;
    email: string;
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

export interface IGetUserProfileRequestAction {
    type: typeof actionTypes.USER_PROFILE_REQUEST;
}

export interface IGetUserProfileSuccessAction {
    type: typeof actionTypes.USER_PROFILE_SUCCESS;
    payload: IUser;
}

export interface IGetUserProfileFailureAction {
    type: typeof actionTypes.USER_PROFILE_FAILURE;
    payload: string;
}

export type IAuthActionList =
    ILoginSuccessAction
    | ILoginFailureAction
    | ILoginRequestAction
    | ILogoutSuccessAction
    | IGetUserProfileRequestAction
    | IGetUserProfileSuccessAction
    | IGetUserProfileFailureAction;
