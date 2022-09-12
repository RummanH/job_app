import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  UPDATE_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  CHANGE_PASSWORD_SUCCESS,
  IS_LOADING,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.text,
      };
    case CLEAR_ALERT:
      return { ...state, showAlert: false, alertType: "", alertText: "" };

    case IS_LOADING:
      return { ...state, isLoading: action.payload };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.user.location,
        jobLocation: action.payload.user.location,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.user.location,
        jobLocation: action.payload.user.location,
      };

    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
        jobLocation: "",
        userLocation: "",
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        userLocation: action.payload.user.location,
        jobLocation: action.payload.user.location,
      };

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
      };

    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };

    default:
      return state;
  }
};

export default reducer;
