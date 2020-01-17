import axios from "axios";
import {
  MCQ_BANK_LIST_LOAD_REQUEST,
  MCQ_BANK_LIST_LOAD_SUCCESS,
  MCQ_BANK_LIST_LOAD_FAILED,
  MCQ_ITEM_LOAD_REQUEST,
  MCQ_ITEM_LOAD_SUCCESS,
  MCQ_ITEM_LOAD_FAILED,
  MCQ_ITEM_UPDATE_REQUEST,
  MCQ_ITEM_UPDATE_SUCCESS,
  MCQ_ITEM_UPDATE_FAILED
} from "../reducers/ques";
import { LOG_FAILED } from "../reducers/auth";
import { SERVER, accessConfig } from "./config";

export const loadMCQBank = (args = null) => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: MCQ_BANK_LIST_LOAD_REQUEST
  });

  var url = `${SERVER}/api/blog/mcq-list/`;
  if (args !== null) {
    url = `${url}?${args.key}=${args.value}`;
  }
  const config = accessConfig(getState());
  axios
    .get(url, config)
    .then(res => {
      dispatch({
        type: MCQ_BANK_LIST_LOAD_SUCCESS,
        payload: res.data.allMcqs
      });
    })
    .catch(err => {
      dispatch({
        type: MCQ_BANK_LIST_LOAD_FAILED
      });
      console.log(err.response);
    });
};

export const mcqIssueSend = obj => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  var formData = new FormData();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  formData.append("user", getState().auth.user.account.id);
  const config = accessConfig(getState());
  axios
    .post(`${SERVER}/api/blog/mcq-issue/`, formData, config)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const loadMCQItem = uid => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: MCQ_ITEM_LOAD_REQUEST
  });

  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/cpanel/mcq-item/${uid}/`, config)
    .then(res => {
      dispatch({
        type: MCQ_ITEM_LOAD_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: MCQ_ITEM_LOAD_FAILED
      });
    });
};

export const updateMCQItem = (obj, uid) => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: MCQ_ITEM_UPDATE_REQUEST
  });
  var formData = new FormData();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  const config = accessConfig(getState());
  axios
    .put(`${SERVER}/api/cpanel/mcq-item/${uid}/`, formData, config)
    .then(res => {
      dispatch({
        type: MCQ_ITEM_UPDATE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: MCQ_ITEM_UPDATE_FAILED
      });
    });
};
