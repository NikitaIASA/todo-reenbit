// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types/authActionsTypes';
import { LoadingStatus } from '@/types/loading-status';
import {
  registerUser,
  login,
  fetchUserProfile,
  changeUserPassword,
} from '@/redux/thunks/auth.thunks';

export interface AuthState {
  status: LoadingStatus;
  user: IUser | null;
  error: string | null;
  isAuth: boolean;
  changePassword: {
    status: LoadingStatus;
    error: string | null;
  };
}

const initialState: AuthState = {
  status: LoadingStatus.IDLE,
  user: null,
  error: null,
  isAuth: false,
  changePassword: {
    status: LoadingStatus.IDLE,
    error: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.status = LoadingStatus.IDLE;
      state.user = null;
      state.error = null;
      state.isAuth = false;
    },
    resetChangePasswordState(state) {
      state.changePassword.status = LoadingStatus.IDLE;
      state.changePassword.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = LoadingStatus.PENDING;
      state.error = null;
      state.isAuth = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.status = LoadingStatus.SUCCEEDED;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = LoadingStatus.FAILED;
      state.error = action.payload || null;
      state.isAuth = false;
    });

    builder.addCase(login.pending, (state) => {
      state.status = LoadingStatus.PENDING;
      state.error = null;
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.status = LoadingStatus.SUCCEEDED;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = LoadingStatus.FAILED;
      state.error = action.payload || null;
      state.isAuth = false;
    });

    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = LoadingStatus.PENDING;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.status = LoadingStatus.SUCCEEDED;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = LoadingStatus.FAILED;
      state.error = action.payload || null;
      state.isAuth = false;
    });

    builder.addCase(changeUserPassword.pending, (state) => {
      state.changePassword.status = LoadingStatus.PENDING;
      state.changePassword.error = null;
    });
    builder.addCase(changeUserPassword.fulfilled, (state) => {
      state.changePassword.status = LoadingStatus.SUCCEEDED;
    });
    builder.addCase(changeUserPassword.rejected, (state, action) => {
      state.changePassword.status = LoadingStatus.FAILED;
      state.changePassword.error = action.payload || null;
    });
  },
});

export const { logout, resetChangePasswordState } = authSlice.actions;
export default authSlice.reducer;
