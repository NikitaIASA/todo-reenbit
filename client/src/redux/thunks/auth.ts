import { Dispatch } from 'redux';

import { loginRequest, loginSuccess, loginFailure } from "@/redux/actions/authActions";
import { setToken } from "@/helpers/tokenHelpers";

import api from "@/core/api";

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
      const { data } = await api.post('/users/login', { email, password });
      const token = data?.token;

      if (!token) {
        throw new Error('No token received');
      }

      setToken(token);
      dispatch(loginSuccess(data));
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data || 'Unknown error'));
      throw error;
    }
  };
};
