import { RootState } from "@/redux/store";

export const selectAuthError = (state: RootState) => state.auth.error;
