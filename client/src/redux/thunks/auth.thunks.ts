import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken, setRefreshToken } from '@/helpers/tokenHelpers';
import { handleAxiosError } from '@/helpers/handleAxiosError';
import { ILoginForm, IRegisterForm } from '@/types/authTypes';
import { IUser } from '@/types/authActionsTypes';
import todoListApi from '@/core/api/todo-list/todo-list-api';

export const registerUser = createAsyncThunk<
  IUser,
  IRegisterForm,
  { rejectValue: string }
>('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const { username, email, password, confirmPassword } = userData;
    const data = await todoListApi.auth.register({ username, email, password, confirmPassword });
    const { accessToken, refreshToken, ...user } = data;

    if (!accessToken || !refreshToken) {
      throw new Error('No tokens received');
    }

    setToken(accessToken);
    setRefreshToken(refreshToken);
    return user;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    return rejectWithValue(errorMessage);
  }
});

export const login = createAsyncThunk<
  IUser,
  ILoginForm,
  { rejectValue: string }
>('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const { email, password } = userData;
    const data = await todoListApi.auth.login({ email, password });
    const { accessToken, refreshToken, ...user } = data;

    if (!accessToken || !refreshToken) {
      throw new Error('No tokens received');
    }

    setToken(accessToken);
    setRefreshToken(refreshToken);
    return user;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    return rejectWithValue(errorMessage);
  }
});

export const fetchUserProfile = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string }
>('auth/fetchUserProfile', async (_, { rejectWithValue }) => {
  try {
    const data = await todoListApi.auth.fetchProfile();
    return data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    return rejectWithValue(errorMessage);
  }
});

export const changeUserPassword = createAsyncThunk<
  void,
  { currentPassword: string; newPassword: string },
  { rejectValue: string }
>(
  'auth/changeUserPassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      await todoListApi.auth.changePassword({ currentPassword, newPassword });
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return rejectWithValue(errorMessage);
    }
  }
);
