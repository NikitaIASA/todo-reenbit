import { useState, FC } from "react";
import ChangePasswordBlock from "./ChangePasswordBlock";
import ProfileBlock from "./ProfileBlock";
import profileIcon from "@/assets/images/profile.svg";
import lockIcon from "@/assets/images/lock.svg";

import "./Profile.scss";

export const Profile: FC = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="profile">
      <ul className="profile__navigation">
        <li
          className={`profile__navigation-item ${
            activeTab === "Profile" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Profile")}
        >
          <img className="profile__icon" src={profileIcon} alt="Profile icon" />
        </li>
        <li
          className={`profile__navigation-item ${
            activeTab === "Security" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Security")}
        >
          <img className="profile__icon" src={lockIcon} alt="Profile icon" />
        </li>
      </ul>
      <div className="profile__tabs">
        <h1 className="profile__title">{activeTab}</h1>
        <div className="profile__info-block">
          {activeTab === "Profile" && <ProfileBlock />}
          {activeTab === "Security" && <ChangePasswordBlock />}
        </div>
      </div>
    </div>
  );
};
