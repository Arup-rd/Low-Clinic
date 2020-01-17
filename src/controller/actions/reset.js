import axios from "axios";
import { SERVER, accessConfig } from "./config";
import {
  PASSWORD_RESET_REQUEST_PENDING,
  PASSWORD_RESET_REQUEST_FAILED,
  PASSWORD_RESET_REQUEST_SUCCESS,
  RESET_TOKEN_VERIFYING,
  RESET_TOKEN_IS_VALID,
  RESET_TOKEN_IS_INVALID,
  PASSWORD_RESET_LOADING,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED
} from "../reducers/reset";
import { LOGIN_SUCCESS, LOG_FAILED, LOGOUT } from "../reducers/auth";

export const resetRequest = email => dispatch => {
  let formData = new FormData();
  formData.append("email", email);

  dispatch({
    type: PASSWORD_RESET_REQUEST_PENDING
  });

  axios
    .post(`${SERVER}/api/account/password-reset/request/`, formData, null)
    .then(res => {
      dispatch({
        type: PASSWORD_RESET_REQUEST_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: PASSWORD_RESET_REQUEST_FAILED
      });
    });
};

export const resetVerify = token => dispatch => {
  let formData = new FormData();
  formData.append("token", token);

  dispatch({
    type: RESET_TOKEN_VERIFYING
  });

  axios
    .post(`${SERVER}/api/account/password-reset/verify/`, formData, null)
    .then(res => {
      dispatch({
        type: RESET_TOKEN_IS_VALID,
        payload: res.data
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: RESET_TOKEN_IS_INVALID,
        message: err.response.data
      });
    });
};

export const passwordReset = data => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }
  let formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  dispatch({
    type: PASSWORD_RESET_LOADING
  });

  const config = accessConfig(getState());
  axios
    .post(`${SERVER}/api/account/password-reset/`, formData, config)
    .then(res => {
      dispatch({
        type: LOGOUT
      });
      dispatch({
        type: PASSWORD_RESET_SUCCESS
      });
    })
    .catch(err => {
      dispatch({
        type: PASSWORD_RESET_FAILED
      });
      console.log(err.response);
    });
};
