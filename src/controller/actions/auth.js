import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGOUT,
  USER_LOAD_REQUEST,
  LOG_FAILED,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAILED,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAILED,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAILED,
  EMAIL_VERIFICATION,
  ACCOUNT_VERIFICATION_REQUEST,
  ACCOUNT_VERIFICATION_FAILED,
  ACCOUNT_VERIFICATION_SUCCESS
} from "../reducers/auth";
import { SERVER, accessConfig } from "./config";

export const login = (email, password) => dispatch => {
  dispatch({
    type: LOGIN_REQUEST
  });

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  axios
    .post(`${SERVER}/api/account/signin/`, formData)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      let message = filterErrorMessage(err);
      dispatch({
        type: LOGIN_FAILED,
        errors: message
      });
    });
};

export const signup = data => dispatch => {
  dispatch({
    type: SIGNUP_REQUEST
  });

  var formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  axios
    .post(`${SERVER}/api/account/signup/`, formData, {})
    .then(res => {
      console.log(res.data);
      if (res.data.res) {
        dispatch({
          type: EMAIL_VERIFICATION
        });
      } else {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch(err => {
      console.log(err);
      const message = filterErrorMessage(err);
      dispatch({
        type: SIGNUP_FAILED,
        errors: message
      });
    });
};

export const verifyAccount = token => dispatch => {
  dispatch({
    type: ACCOUNT_VERIFICATION_REQUEST
  });

  let formData = new FormData();
  formData.append("token", token);

  axios
    .post(`${SERVER}/api/account/verify/`, formData, null)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      dispatch({
        type: ACCOUNT_VERIFICATION_SUCCESS
      });
    })
    .catch(err => {
      let message = filterErrorMessage(err);
      dispatch({
        type: ACCOUNT_VERIFICATION_FAILED,
        errors: message
      });
    });
};

const filterErrorMessage = err => {
  let error;
  if (err.response) {
    for (const key in err.response.data) {
      error = err.response.data[key][0];
      break;
    }
  } else if (err.request) {
    error = "request failed";
  } else {
    error = "something went wrong";
  }
  return error;
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};

export const loadUser = () => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: USER_LOAD_REQUEST
  });

  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/account/profile/`, config)
    .then(res => {
      dispatch({
        type: USER_LOAD_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: LOG_FAILED
        });
      } else {
        dispatch({
          type: USER_LOAD_FAILED
        });
      }
    });
};

export const addUserInfo = info => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: USER_LOAD_REQUEST
  });

  var formData = new FormData();
  for (const key in info) {
    formData.append(key, info[key]);
  }

  const config = accessConfig(getState());
  axios
    .post(`${SERVER}/api/account/profile/`, formData, config)
    .then(res => {
      dispatch({
        type: USER_LOAD_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: USER_LOAD_FAILED
      });
      console.log(err.response);
    });
};

export const updateAccount = info => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: ACCOUNT_UPDATE_REQUEST
  });

  var formData = new FormData();
  for (const key in info) {
    formData.append(key, info[key]);
  }
  const config = accessConfig(getState());
  axios
    .put(`${SERVER}/api/account/update/`, formData, config)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ACCOUNT_UPDATE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      const message = filterErrorMessage(err);
      dispatch({
        type: ACCOUNT_UPDATE_FAILED,
        errors: message
      });
    });
};

export const updatePassword = info => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: PASSWORD_CHANGE_REQUEST
  });

  var formData = new FormData();
  for (const key in info) {
    formData.append(key, info[key]);
  }
  const config = accessConfig(getState());
  axios
    .post(`${SERVER}/api/account/password-change/`, formData, config)
    .then(res => {
      dispatch({
        type: PASSWORD_CHANGE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      const message = filterErrorMessage(err);
      dispatch({
        type: PASSWORD_CHANGE_FAILED,
        errors: message
      });
    });
};

export const updateProfile = info => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: ACCOUNT_UPDATE_REQUEST
  });

  var formData = new FormData();
  for (const key in info) {
    formData.append(key, info[key]);
  }
  const config = accessConfig(getState());
  axios
    .put(`${SERVER}/api/account/profile/`, formData, config)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ACCOUNT_UPDATE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      const message = filterErrorMessage(err);
      dispatch({
        type: ACCOUNT_UPDATE_FAILED,
        errors: message
      });
    });
};
