export const PASSWORD_RESET_REQUEST_PENDING = "PASSWORD_RESET_REQUEST_PENDING";
export const PASSWORD_RESET_REQUEST_FAILED = "PASSWORD_RESET_REQUEST_FAILED";
export const PASSWORD_RESET_REQUEST_SUCCESS = "PASSWORD_RESET_REQUEST_SUCCESS";

export const RESET_TOKEN_VERIFYING = "RESET_TOKEN_VERIFYING";
export const RESET_TOKEN_IS_VALID = "RESET_TOKEN_IS_VALID";
export const RESET_TOKEN_IS_INVALID = "RESET_TOKEN_IS_INVALID";

export const PASSWORD_RESET_LOADING = "PASSWORD_RESET_LOADING";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAILED";

const initialState = {
  isResetRequesting: false,
  isResetRequestFailed: false,
  isResetRequestSuccess: false,

  isVerifying: false,
  isValid: false,
  isInvalid: false,
  message: "",

  isPasswordResetloading: false,
  isPasswordResetRequestSuccess: false,
  isPasswordResetRequestFailed: false
};

export default function(state = initialState, action) {
  if (action.type === PASSWORD_RESET_REQUEST_PENDING) {
    return {
      ...state,
      isResetRequesting: true
    };
  }

  if (action.type === PASSWORD_RESET_REQUEST_SUCCESS) {
    return {
      ...state,
      isResetRequesting: false,
      isResetRequestSuccess: true
    };
  }

  if (action.type === PASSWORD_RESET_REQUEST_FAILED) {
    return {
      ...state,
      isResetRequesting: false,
      isResetRequestFailed: true
    };
  }

  if (action.type === RESET_TOKEN_VERIFYING) {
    return {
      ...state,
      isVerifying: true
    };
  }

  if (action.type === RESET_TOKEN_IS_VALID) {
    return {
      ...state,
      isVerifying: false,
      isValid: true
    };
  }

  if (action.type === RESET_TOKEN_IS_INVALID) {
    return {
      ...state,
      isVerifying: false,
      isInvalid: true,
      message: action.message
    };
  }

  if (action.type === PASSWORD_RESET_LOADING) {
    return {
      ...state,
      isPasswordResetloading: true
    };
  }
  if (action.type === PASSWORD_RESET_SUCCESS) {
    return {
      ...state,
      isPasswordResetloading: false,
      isPasswordResetRequestSuccess: true
    };
  }
  if (action.type === PASSWORD_RESET_FAILED) {
    return {
      ...state,
      isPasswordResetloading: false,
      isPasswordResetRequestFailed: true
    };
  }
  return state;
}
