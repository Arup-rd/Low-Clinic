import axios from "axios";
import {
  FOLDER_CREATE_FAILED,
  FOLDER_CREATE_SUCCESS,
  FOLDER_CREATE_REQUEST,
  SUBJECT_LOAD_SUCCESS,
  SUBJECT_LOAD_REQUEST,
  SUBJECT_LOAD_FAILED,
  FOLDER_LOAD_SUCCESS,
  FOLDER_LOAD_REQUEST,
  FOLDER_LOAD_FAILED
} from "../reducers/folder";
import { LOG_FAILED } from "../reducers/auth";
import { SERVER, accessConfig } from "./config";

export const loadSubjects = () => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: SUBJECT_LOAD_REQUEST
  });

  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/blog/subjects/`, config)
    .then(res => {
      dispatch({
        type: SUBJECT_LOAD_SUCCESS,
        payload: res.data.allFolders.edges
      });
    })
    .catch(err => {
      dispatch({
        type: SUBJECT_LOAD_FAILED
      });
      console.log(err.response);
    });
};

export const exploreFolder = location => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: FOLDER_LOAD_REQUEST
  });

  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/blog/folder/?location=${location}`, config)
    .then(res => {
      dispatch({
        type: FOLDER_LOAD_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FOLDER_LOAD_FAILED
      });
      console.log(err.response);
    });
};

export const createFolder = data => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: FOLDER_CREATE_REQUEST
  });

  var formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  const config = accessConfig(getState());
  axios
    .post(`${SERVER}/api/blog/folder/`, formData, config)
    .then(res => {
      dispatch({
        type: FOLDER_CREATE_SUCCESS,
        payload: res.data.folder
      });
    })
    .catch(err => {
      dispatch({
        type: FOLDER_CREATE_FAILED
      });
      console.log(err.response);
    });
};
