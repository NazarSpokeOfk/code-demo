import React from "react";
import { NavigateFunction } from "react-router-dom";
import { UserData, LogInData, LogInStatus } from "../interfaces/interfaces";

export type TypesOfSets = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setLogInStatus: React.Dispatch<React.SetStateAction<LogInStatus>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLogInData: React.Dispatch<React.SetStateAction<LogInData>>;
};

type SelectProps<T, K extends keyof T> = Pick<T, K>;

export type CommonTypes = {
  userData: UserData;
  isLoggedIn?: boolean;
};

export type FetchDataToDBProps = {
  endpoint: string;
  method: "POST" | "GET" | "DELETE" | "PUT";
  body: object;
  csrfToken?: string;
  withToast?: boolean;
};

export type LogInFunctionProps = {
  logInData: LogInData;
} & SelectProps<
  TypesOfSets,
  | "setUserData"
  | "setIsLoggedIn"
  | "setLogInStatus"
  | "setIsLoading"
  | "setError"
>;

export type ValidateLogInProps = {
  data: LogInData;
} & SelectProps<TypesOfSets, "setUserData" | "setIsLoggedIn">;

export type RedirectToMainPageProps = {
  logInStatus: LogInStatus;
  navigate: NavigateFunction;
};

export type MainFormProps = {
  logInData: LogInData;
  isLoading : boolean;
  loading : string
} & SelectProps<
  TypesOfSets,
  | "setLogInData"
  | "setUserData"
  | "setIsLoggedIn"
  | "setLogInStatus"
  | "setIsLoading"
  | "setError"
>;
