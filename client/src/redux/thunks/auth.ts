import { Dispatch } from 'redux';

import { loginRequest, loginSuccess, loginFailure, registerRequest, registerSuccess, registerFailure } from "@/redux/actions/authActions";
import { setRefreshToken, setToken } from "@/helpers/tokenHelpers";
import { ILoginForm, IRegisterForm } from '@/types/authTypes';

import api from "@/core/api";

export const registerUser = (userData: IRegisterForm) => {
  return async (dispatch: Dispatch) => {
    const { username, email, password, confirmPassword } = userData;
    dispatch(registerRequest());
    try {
      const { data } = await api.post('/users/register', { username, email, password, confirmPassword });
      const accessToken = data?.accessToken;
      const refreshToken = data?.refreshToken;

      if (!accessToken || !refreshToken) {
        throw new Error('No tokens received');
      }

      setToken(accessToken);
      setRefreshToken(refreshToken);
      dispatch(registerSuccess(data));
    } catch (error: any) {
      dispatch(registerFailure(error.response?.data || 'Unknown error'));
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
      const accessToken = data?.accessToken;
      const refreshToken = data?.refreshToken;

      if (!accessToken || !refreshToken) {
        throw new Error('No tokens received');
      }

      setToken(accessToken);
      setRefreshToken(refreshToken);
      dispatch(loginSuccess(data));
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data || 'Unknown error'));
      throw error;
    }
  };
};

