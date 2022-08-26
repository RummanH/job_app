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
import { initialState } from "./appContext";

const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values!",
      };
    case CLEAR_ALERT:
      return { ...state, showAlert: false, alertType: "", alertText: "" };

    case REGISTER_USER_BEGIN:
      return { ...state, isLoading: false };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.user.location,
        jobLocation: action.payload.user.location,
        showAlert: true,
        alertType: "success",
        alertText: "Successfully signup redirecting...",
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload,
      };

    case LOGIN_USER_BEGIN:
      return { ...state, isLoading: false };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.user.location,
        jobLocation: action.payload.user.location,
        showAlert: true,
        alertType: "success",
        alertText: "Successfully Login redirecting...",
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
        jobLocation: "",
        userLocation: "",
      };

    case UPDATE_USER_BEGIN:
      return { ...state, isLoading: true };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        userLocation: action.payload.user.location,
        jobLocation: action.payload.user.location,
        showAlert: true,
        alertType: "success",
        alertText: "Profile Updated Successfully!",
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        isLoading: false,
        alertText: action.payload,
      };

    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };

    default:
      return state;
  }
};

export default reducer;
