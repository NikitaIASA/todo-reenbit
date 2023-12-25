import { Dispatch } from 'redux';

import api from "@/core/api";
import { loginRequest, loginSuccess, loginFailure } from "@/redux/actions/authActions";

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
      const { data } = await api.post('/users/login', { email, password });
      const token = data?.token;

      if (!token) {
        throw new Error('No token received');
      }

      localStorage.setItem('token', token);
      dispatch(loginSuccess(data));
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data || 'Unknown error'));
      throw error; 
    }
  };
};
