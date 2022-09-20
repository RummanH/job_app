import React, { createContext, useReducer, useContext } from "react";
import { useDispatch } from "react-redux";

import axios from "axios";

import { clearAll } from "../redux-store/features/jobInputSlice";
import { clearJobs } from "../redux-store/features/jobsSlice";

import {
  addUserToLocalStorage,
  removeUserToLocalStorage,
} from "../services/localStorage";

import {
  CLEAR_ALERT,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  CHANGE_PASSWORD_SUCCESS,
  DISPLAY_ALERT,
  IS_LOADING,
} from "./actions";

import reducers from "./reducers";

const URL = "https://localhost:5000";

const loggedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const userToken = localStorage.getItem("token");

const initialState = {
  showSidebar: false,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: loggedUser,
  token: userToken ? userToken : null,
  userLocation: loggedUser ? loggedUser.location : "",
  jobLocation: loggedUser ? loggedUser.location : "",
};

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  const reduxDispatch = useDispatch();

  // axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;

  const authFetch = axios.create({
    baseURL: URL,
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err.response.status === 401) {
        // logoutUser();
      }

      return Promise.reject(err);
    }
  );

  const displayAlert = (payload) => {
    dispatch({ type: DISPLAY_ALERT, payload });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 1500);
  };

  const isLoading = (status) => {
    dispatch({ type: IS_LOADING, payload: status });
  };

  const registerUser = async (currentUser) => {
    isLoading(true);
    try {
      const { data } = await axios.post(
        `${URL}/api/v1/users/signup`,
        currentUser
      );

      const user = data.data.user;
      const token = data.token;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { token, user },
      });
      addUserToLocalStorage({ user, token });
      displayAlert({
        type: "success",
        text: "Signup successful redirecting...",
      });
      isLoading(false);
    } catch (err) {
      isLoading(false);
      displayAlert({
        type: "danger",
        text: err.response.data.message,
      });
    }
  };

  const loginUser = async (currentUser) => {
    isLoading(true);
    try {
      const { data } = await axios.post(
        `${URL}/api/v1/users/login`,
        currentUser
      );

      const token = data.token;
      const user = data.data.user;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { token, user } });
      addUserToLocalStorage({ user, token });
      displayAlert({
        type: "success",
        text: "login successful...",
      });
      isLoading(false);
    } catch (err) {
      isLoading(false);
      displayAlert({
        type: "danger",
        text: err.response.data.message,
      });
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserToLocalStorage();
    reduxDispatch(clearAll());
    reduxDispatch(clearJobs());
  };

  const updateUser = async (currentUser) => {
    isLoading(true);
    try {
      const { data } = await authFetch.patch(
        "/api/v1/users/updateMe",
        currentUser
      );
      const user = data.data.user;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user } });
      addUserToLocalStorage({ user });
      displayAlert({ type: "success", text: "Profile updated" });
      isLoading(false);
    } catch (err) {
      isLoading(false);
      displayAlert({ type: "danger", text: err.response.data.message });
    }
  };

  const changePassword = async (currentUser) => {
    console.log("hello");
    isLoading(true);
    try {
      const { data } = await authFetch.patch(
        "/api/v1/users/updateMyPassword",
        currentUser
      );
      const { token } = data;
      dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: { token } });
      addUserToLocalStorage({ token });
      displayAlert({ type: "success", text: "Password changed." });
      isLoading(false);
      return true;
    } catch (err) {
      isLoading(false);
      console.log("hi");
      displayAlert({ type: "danger", text: err.response.data.message });
    }
  };

  const toggleSideBar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSideBar,
        logoutUser,
        updateUser,
        changePassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
