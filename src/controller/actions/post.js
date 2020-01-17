import axios from "axios";
import {
  POST_LOAD_SUCCESS,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAILED,
  POST_CREATE_REQUEST,
  POST_LOAD_REQUEST,
  POST_LOAD_FAILED
} from "../reducers/post";
import { LOG_FAILED } from "../reducers/auth";
import { SERVER, accessConfig } from "./config";

export const loadPost = uid => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }
  dispatch({
    type: POST_LOAD_REQUEST
  });

  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/blog/post/?uid=${uid}`, config)
    .then(res => {
      dispatch({
        type: POST_LOAD_SUCCESS,
        payload: res.data.post
      });
    })
    .catch(err => {
      dispatch({
        type: POST_LOAD_FAILED
      });
      console.log(err.response);
    });
};

export const createPost = data => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: POST_CREATE_REQUEST
  });

  var formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  const config = accessConfig(getState());
  axios
    .post(`${SERVER}/api/blog/post/`, formData, config)
    .then(res => {
      dispatch({
        type: POST_CREATE_SUCCESS,
        payload: res.data.post
      });
    })
    .catch(err => {
      dispatch({
        type: POST_CREATE_FAILED
      });
      console.log(err);
    });
};
