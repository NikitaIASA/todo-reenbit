import { actionTypes } from '@/types/actionTypes';
import { ILoginFailureAction, ILoginRequestAction, ILoginSuccessAction, ILogoutSuccessAction, IUser, IUserReg } from '@/types/authActionsTypes';

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

export const registerRequest = () => ({
    type: actionTypes.REGISTER_REQUEST,
});

export const registerSuccess = (userData: IUserReg) => ({
    type: actionTypes.REGISTER_SUCCESS,
    payload: userData,
});

export const registerFailure = (error: string) => ({
    type: actionTypes.REGISTER_FAILURE,
    payload: error,
});