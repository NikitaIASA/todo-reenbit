import { actionTypes } from '@/types/actionTypes';
import { ILoginFailureAction, ILoginRequestAction, ILoginSuccessAction, ILogoutSuccessAction, IUser } from '@/types/authActionsTypes';

export const loginRequest = (): ILoginRequestAction => ({
    type: actionTypes.LOGIN_REQUEST,
});

export const loginSuccess = (user: IUser): ILoginSuccessAction => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error: string): ILoginFailureAction => ({
    type: actionTypes.LOGIN_FAILURE,
    payload: error,
});

export const logoutSuccess = (): ILogoutSuccessAction => ({
    type: actionTypes.LOGOUT_SUCCESS,
});

export const userProfileRequest = () => ({
    type: actionTypes.USER_PROFILE_REQUEST,
});

export const userProfileSuccess = (userData: IUser) => ({
    type: actionTypes.USER_PROFILE_SUCCESS,
    payload: userData,
});

export const userProfileFailure = (error: string) => ({
    type: actionTypes.USER_PROFILE_FAILURE,
    payload: error,
});

export const changePasswordRequest = () => ({
    type: actionTypes.CHANGE_PASSWORD_REQUEST,
});

export const changePasswordSuccess = () => ({
    type: actionTypes.CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure = (error: string) => ({
    type: actionTypes.CHANGE_PASSWORD_FAILURE,
    payload: error,
});
