import { Dispatch } from 'redux';

import { loginRequest, loginSuccess, loginFailure, userProfileRequest, userProfileSuccess, userProfileFailure, changePasswordRequest, changePasswordSuccess, changePasswordFailure } from "@/redux/actions/authActions";
import { setRefreshToken, setToken } from "@/helpers/tokenHelpers";
import { ILoginForm, IRegisterForm } from '@/types/authTypes';
import { handleAxiosError } from '@/helpers/handleAxiosError';

import api from "@/core/api";

export const registerUser = (userData: IRegisterForm) => {
  return async (dispatch: Dispatch) => {
    const { username, email, password, confirmPassword } = userData;
    dispatch(loginRequest());
    try {
      const { data } = await api.post('/users/register', { username, email, password, confirmPassword });
      const { accessToken, refreshToken, ...userData } = data;

      if (!accessToken || !refreshToken) {
        throw new Error('No tokens received');
      }

      setToken(accessToken);
      setRefreshToken(refreshToken);
      dispatch(loginSuccess(userData));
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  };
};

export const login = (userData: ILoginForm) => {
  return async (dispatch: Dispatch) => {
    const { email, password } = userData;
    dispatch(loginRequest());
    try {
      const { data } = await api.post('/users/login', { email, password });
      const { accessToken, refreshToken, ...userData } = data;

      if (!accessToken || !refreshToken) {
        throw new Error('No tokens received');
      }

      setToken(accessToken);
      setRefreshToken(refreshToken);
      dispatch(loginSuccess(userData));
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      dispatch(loginFailure(errorMessage));
    }
  };
};

export const fetchUserProfile = () => {
  return async (dispatch: Dispatch) => {
    dispatch(userProfileRequest());
    try {
      const { data } = await api.get('/users/profile');
      dispatch(userProfileSuccess(data));
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      dispatch(userProfileFailure(errorMessage));
    }
  };
};

export const changeUserPassword = (currentPassword: string, newPassword: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(changePasswordRequest());
    try {
      await api.post('/users/change-password', { currentPassword, newPassword });
      dispatch(changePasswordSuccess());
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      dispatch(changePasswordFailure(errorMessage));
    }
  };
}
