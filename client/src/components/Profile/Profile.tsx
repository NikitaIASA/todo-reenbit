import { FC } from "react";

import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/redux/store";

import "./Profile.scss";

export const Profile: FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  console.log(user);
  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-info">
        <p>
          <strong>Username</strong> {user?.username}
        </p>
        <p>
          <strong>Email</strong> {user?.email}
        </p>
      </div>
    </div>
  );
};
