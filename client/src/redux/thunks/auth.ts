import { Dispatch } from 'redux';

import { loginRequest, loginSuccess, loginFailure } from "@/redux/actions/authActions";
import { setRefreshToken, setToken } from "@/helpers/tokenHelpers";

import api from "@/core/api";

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
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
