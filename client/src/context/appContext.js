import React, { createContext, useReducer, useContext } from "react";

import axios from "axios";

import {
  addUserToLocalStorage,
  removeUserToLocalStorage,
} from "../services/localStorage";

import {
  SHOW_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  TOGGLE_SIDEBAR,
} from "./actions";

import reducers from "./reducers";

const URL = "http://localhost:5000";

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
        logoutUser();
      }

      return Promise.reject(err);
    }
  );

  const displayAlert = () => {
    dispatch({ type: SHOW_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 1500);
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `${URL}/api/v1/users/signup`,
        currentUser
      );

      const user = data.data.user;
      const token = data.token;
      addUserToLocalStorage({ user, token });

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { token, user },
      });
    } catch (err) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: err.response.data.message,
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `${URL}/api/v1/users/login`,
        currentUser
      );

      const token = data.token;
      const user = data.data.user;
      addUserToLocalStorage({ user, token });

      dispatch({ type: LOGIN_USER_SUCCESS, payload: { token, user } });
    } catch (err) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: err.response.data.message,
      });
    }

    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserToLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch(
        "/api/v1/users/updateMe",
        currentUser
      );
      const user = data.data.user;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user } });
      addUserToLocalStorage({ user });
    } catch (err) {
      if (err.response.data.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: err.response.data.message,
        });
      }
    }

    clearAlert();
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
