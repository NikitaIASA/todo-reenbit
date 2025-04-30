import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import CustomButton from "../UI/CustomButton";
import { useAuth } from "@/hooks/useAuth";
import { ROUTE_PATHS } from "@/consts/routePaths";
import { useModal } from "@/hooks/useModal";
import ConfirmationModal from "../ConfirmationModal";
import { ButtonVariants } from "@/types/buttonTypes";
import { removeRefreshToken, removeToken } from "@/helpers/tokenHelpers";
import logo from "@/assets/images/logo.svg";
import profileIcon from "@/assets/images/profile.svg";

import "./Header.scss";
import { logout } from "@/redux/reducers/auth.reducer";
import { resetTodoState } from "@/redux/reducers/tasks.reducer";

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleLogout = () => {
    removeToken();
    removeRefreshToken();
    dispatch(logout());
    dispatch(resetTodoState());
    closeModal();
    navigate(ROUTE_PATHS.SIGN_IN);
  };

  return (
    <>
      <header className="header">
        <Link className="header__title" to="/">
          <img className="header____logo" src={logo} alt="Reenbit logo" />
          <h1 className="header__text">Daily Planner</h1>
        </Link>
        <div className="header__nav-block">
          {isAuth && (
            <Link className="header__title" to="/profile">
              <img
                className="header__img"
                src={profileIcon}
                alt="Profile icon link"
              />
            </Link>
          )}
          {isAuth && (
            <CustomButton
              variant={ButtonVariants.SECONDARY}
              className="header__logout"
              onClick={openModal}
            >
              Logout
            </CustomButton>
          )}
        </div>
      </header>
      {isModalOpen && (
        <ConfirmationModal
          message={`Are you sure that you want to logout?`}
          onConfirm={handleLogout}
          onClose={closeModal}
        />
      )}
    </>
  );
};
