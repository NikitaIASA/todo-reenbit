import { Dispatch } from 'redux';

import { loginRequest, loginSuccess, loginFailure } from "@/redux/actions/authActions";
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

