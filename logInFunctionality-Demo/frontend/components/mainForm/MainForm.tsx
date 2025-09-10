import React from "react"

import { useTranslation } from "react-i18next";
import { MainFormProps } from "../../types/types";

import LogInPageFunctions from "./functions/LogInPageFunctions";

const MainForm = ({
  logInData,
  setLogInData,
  setUserData,
  setIsLoggedIn,
  setLogInStatus,
  setIsLoading,
  setError,
  isLoading,
  loading,
}: MainFormProps) => {
  const { t } = useTranslation();
  const logInPageFunctions = new LogInPageFunctions();
  return (
    <>
      <h1 className="login__block-title">
        Welcome back
      </h1>
      <div className="login__block">
        <form className="form__input-block" action="submit">
          <div className="input__block">
            <input
              value={logInData.email}
              onChange={(e) => {
                const value = e.target.value;
                setLogInData((prev) => ({ ...prev, email: value }));
              }}
              required
              type="email"
              id="email"
              className="input"
            />
            <div className="placeholder">
              <span>{t("email")}</span>
            </div>
          </div>

          <div className="input__block">
            <input
              value={logInData.password}
              onChange={(e) => {
                const value = e.target.value;
                setLogInData((prev) => ({ ...prev, password: value }));
              }}
              required
              id="password"
              type="text"
              className="input"
            />
            <div className="placeholder">
              <span>{t("password")}</span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              logInPageFunctions.logIn({
                logInData,
                setUserData,
                setIsLoggedIn,
                setLogInStatus,
                setIsLoading,
                setError,
              });
            }}
            className="fancy-button"
          >
            {t("continue")}
          </button>
        </form>

        {isLoading ? (
          <>
            <img src={loading} className="loading" alt="" />
          </>
        ) : null}
      </div>
    </>
  );
};
export default MainForm;
