/// <reference types="vite/client" />

import { handleHttpError } from "../utilities/errorHandler";

const apiBaseUrl = import.meta.env.VITE_API_URL;

import {
  FetchDataToDBProps,
} from "../types/types";

import { toast } from "react-toastify";

import i18n from "i18next";

import { ValidateLogInProps } from "../types/types";

class DataToDB {

  async fetchData({
    endpoint,
    method,
    body,
    csrfToken,
    withToast,
  }: FetchDataToDBProps) {
    const headers = {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken || "",
    };

    const fetchPromise = (async () => {
      const response = await fetch(endpoint, {
        method,
        headers,
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        handleHttpError(response);
        throw response;
      }

      return await response.json();
    })();

    if (withToast) {
      return toast.promise(fetchPromise, {
        pending: i18n.t("Загрузка..."),
        success: i18n.t("Успешно!"),
        error: i18n.t("Ошибка запроса"),
      });
    } else {
      return fetchPromise;
    }
  }

  async validateLogIn({
    data,
    setUserData,
    setIsLoggedIn,
  }: ValidateLogInProps) {
    console.log(setIsLoggedIn);
    try {
      const request = await this.fetchData({
        endpoint: `${apiBaseUrl}/login`,
        method: "POST",
        body: data,
      });
      if(request.data){
        setIsLoggedIn(true);
        setUserData?.(request.data);
        return true
      } else {
        setIsLoggedIn(false);
        return false
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn?.(false);
      return false;
    }
  }
}

export default DataToDB;
