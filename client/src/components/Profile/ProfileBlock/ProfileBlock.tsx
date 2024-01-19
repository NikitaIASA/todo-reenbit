import { FC } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";

import "./ProfileBlock.scss";

export const ProfileBlock: FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="profile__block">
      <ul className="profile__list">
        <li className="profile__list-item">
          <div>
            <p className="profile__key">Username</p>
            <p className="profile__value">{user?.username}</p>
          </div>
        </li>
        <li className="profile__list-item">
          <div>
            <p className="profile__key">Email</p>
            <p className="profile__value">{user?.email}</p>
          </div>
        </li>
      </ul>
      <div className="profile__image"></div>
    </div>
  );
};
