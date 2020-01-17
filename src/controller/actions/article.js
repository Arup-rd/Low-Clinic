import axios from "axios";
import {
  ARTICLE_LOAD_SUCCESS,
  ARTICLE_CREATE_SUCCESS,
  ARTICLE_CREATE_FAILED,
  ARTICLE_CREATE_REQUEST,
  ARTICLE_LOAD_REQUEST,
  ARTICLE_LOAD_FAILED
} from "../reducers/article";
import { LOG_FAILED } from "../reducers/auth";
import { SERVER, accessConfig } from "./config";

export const loadArticle = uid => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }
  dispatch({
    type: ARTICLE_LOAD_REQUEST
  });

  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/draft/article/?uid=${uid}`, config)
    .then(res => {
      dispatch({
        type: ARTICLE_LOAD_SUCCESS,
        payload: res.data.article
      });
    })
    .catch(err => {
      dispatch({
        type: ARTICLE_LOAD_FAILED
      });
      console.log(err.response);
    });
};

export const createArticle = data => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: ARTICLE_CREATE_REQUEST
  });

  var formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  const config = accessConfig(getState());
  axios
    .post(`${SERVER}/api/draft/article/`, formData, config)
    .then(res => {
      dispatch({
        type: ARTICLE_CREATE_SUCCESS,
        payload: res.data.article
      });
    })
    .catch(err => {
      dispatch({
        type: ARTICLE_CREATE_FAILED
      });
      console.log(err);
    });
};
