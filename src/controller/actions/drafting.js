import axios from "axios";
import {
  DIRECTORY_CREATE_FAILED,
  DIRECTORY_CREATE_SUCCESS,
  DIRECTORY_CREATE_REQUEST,
  ROOT_LOAD_SUCCESS,
  ROOT_LOAD_REQUEST,
  ROOT_LOAD_FAILED,
  DIRECTORY_LOAD_SUCCESS,
  DIRECTORY_LOAD_REQUEST,
  DIRECTORY_LOAD_FAILED
} from "../reducers/drafting";
import { LOG_FAILED } from "../reducers/auth";
import { SERVER, accessConfig } from "./config";

export const loadRoots = () => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: ROOT_LOAD_REQUEST
  });

  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/draft/root-directories/`, config)
    .then(res => {
      dispatch({
        type: ROOT_LOAD_SUCCESS,
        payload: res.data.allDirectories.edges
      });
    })
    .catch(err => {
      dispatch({
        type: ROOT_LOAD_FAILED
      });
      console.log(err.response);
    });
};

export const exploreDirectory = location => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: DIRECTORY_LOAD_REQUEST
  });

  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/draft/directory/?location=${location}`, config)
    .then(res => {
      dispatch({
        type: DIRECTORY_LOAD_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: DIRECTORY_LOAD_FAILED
      });
      console.log(err);
    });
};

export const createDirectory = data => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: DIRECTORY_CREATE_REQUEST
  });

  var formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  const config = accessConfig(getState());
  axios
    .post(`${SERVER}/api/draft/directory/`, formData, config)
    .then(res => {
      dispatch({
        type: DIRECTORY_CREATE_SUCCESS,
        payload: res.data.directory
      });
    })
    .catch(err => {
      dispatch({
        type: DIRECTORY_CREATE_FAILED
      });
      console.log(err.response);
    });
};
