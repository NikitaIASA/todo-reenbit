import { FC, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchUserProfile } from "@/redux/thunks/auth.thunks";
import Profile from "@/components/Profile";

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return <Profile />;
};
