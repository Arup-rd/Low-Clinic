export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

export const LOGOUT = "LOGOUT";
export const LOG_FAILED = "LOG_FAILED";

export const USER_LOAD_REQUEST = "USER_LOAD_REQUEST";
export const USER_LOAD_SUCCESS = "USER_LOAD_SUCCESS";
export const USER_LOAD_FAILED = "USER_LOAD_FAILED";

export const ACCOUNT_UPDATE_REQUEST = "ACCOUNT_UPDATE_REQUEST";
export const ACCOUNT_UPDATE_SUCCESS = "ACCOUNT_UPDATE_SUCCESS";
export const ACCOUNT_UPDATE_FAILED = "ACCOUNT_UPDATE_FAILED";

export const PASSWORD_CHANGE_REQUEST = "PASSWORD_CHANGE_REQUEST";
export const PASSWORD_CHANGE_SUCCESS = "PASSWORD_CHANGE_SUCCESS";
export const PASSWORD_CHANGE_FAILED = "PASSWORD_CHANGE_FAILED";

export const EMAIL_VERIFICATION = "EMAIL_VERIFICATION";

export const ACCOUNT_VERIFICATION_REQUEST = "ACCOUNT_VERIFICATION_REQUEST";
export const ACCOUNT_VERIFICATION_SUCCESS = "ACCOUNT_VERIFICATION_SUCCESS";
export const ACCOUNT_VERIFICATION_FAILED = "ACCOUNT_VERIFICATION_FAILED";

const initialState = {
  access: localStorage.getItem("access_token"),
  refresh: localStorage.getItem("refresh_token"),
  isAuthenticated: localStorage.getItem("authenticated") ? true : false,

  isAuthenticationFailed: false,
  isLoading: false,
  isFailed: false,
  isSuccess: false,

  updateRequest: false,
  updateFailed: false,
  updateSuccess: false,
  updatedData: null,

  waitingForVerification: false,

  user: null,
  message: null,

  isVerificationLoading: false,
  isVerificationSuccess: false,
  isVerificationFailed: false
};

export default function(state = initialState, action) {
  const type = action.type;

  if (type === LOGIN_REQUEST || type === SIGNUP_REQUEST) {
    return {
      ...state,
      isLoading: true,
      isAuthenticationFailed: false,
      isSuccess: false
    };
  }

  if (
    type === LOGIN_FAILED ||
    type === SIGNUP_FAILED ||
    type === USER_LOAD_FAILED
  ) {
    return {
      ...state,
      isLoading: false,
      isAuthenticationFailed: true,
      message: action.errors
    };
  }

  if (type === LOGIN_SUCCESS || type === SIGNUP_SUCCESS) {
    localStorage.setItem("access_token", action.payload.access);
    localStorage.setItem("refresh_token", action.payload.refresh);
    localStorage.setItem("authenticated", true);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      isAuthenticated: true,
      isAuthenticationFailed: false,
      access: action.payload.access,
      refresh: action.payload.refresh
    };
  }

  if (type === EMAIL_VERIFICATION) {
    return {
      ...state,
      waitingForVerification: true
    };
  }

  if (type === USER_LOAD_REQUEST) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (type === USER_LOAD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      user: action.payload
    };
  }

  if (type === LOGOUT || type === LOG_FAILED) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("authenticated");
    return {
      ...state,
      user: null,
      isLoading: false,
      isSuccess: false,
      isFailed: true,
      isAuthenticated: false,
      message: "Invalid request"
    };
  }

  if (type === ACCOUNT_UPDATE_REQUEST || type === PASSWORD_CHANGE_REQUEST) {
    return {
      ...state,
      updateRequest: true,
      updateSuccess: false,
      updateFailed: false
    };
  }
  if (type === ACCOUNT_UPDATE_SUCCESS) {
    return {
      ...state,
      updateRequest: false,
      updateSuccess: true,
      updateFailed: false,
      updatedData: action.payload
    };
  }
  if (type === ACCOUNT_UPDATE_FAILED || type === PASSWORD_CHANGE_FAILED) {
    return {
      ...state,
      updateRequest: false,
      updateSuccess: false,
      updateFailed: true,
      message: action.errors
    };
  }

  if (type === PASSWORD_CHANGE_SUCCESS) {
    localStorage.setItem("access_token", action.payload.access);
    localStorage.setItem("refresh_token", action.payload.refresh);
    return {
      ...state,
      access: action.payload.access,
      refresh: action.payload.refresh,
      updateRequest: false,
      updateSuccess: true,
      updateFailed: false
    };
  }

  if (type === ACCOUNT_VERIFICATION_REQUEST) {
    return {
      ...state,
      isVerificationLoading: true
    };
  }

  if (type === ACCOUNT_VERIFICATION_SUCCESS) {
    return {
      ...state,
      isVerificationLoading: false,
      isVerificationSuccess: true
    };
  }

  if (type === ACCOUNT_VERIFICATION_FAILED) {
    return {
      ...state,
      isVerificationLoading: false,
      isVerificationFailed: true
    };
  }

  return state;
}
