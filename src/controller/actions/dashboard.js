import axios from "axios";
import { accessConfig, SERVER } from "./config";
import {
  DASHBOARD_OVERVIEW_REQUEST,
  DASHBOARD_OVERVIEW_FAILED,
  DASHBOARD_OVERVIEW_SUCCESS,
  ALLUSER_LOAD_REQUEST,
  ALLUSER_LOAD_SUCCESS,
  ALLUSER_LOAD_FAILED,
  ALL_ISSUES_LOAD_REQUEST,
  ALL_ISSUES_LOAD_SUCCESS,
  ALL_ISSUES_LOAD_FAILED,
  ALLUSER_UPDATE_REQUEST,
  ALL_MESSAGE_LOAD_REQUEST,
  ALL_MESSAGE_UPDATE_REQUEST,
  ALL_MESSAGE_LOAD_SUCCESS,
  ALL_MESSAGE_LOAD_FAILED
} from "../reducers/dashboard";

export const loadOverview = () => (dispatch, getState) => {
  dispatch({
    type: DASHBOARD_OVERVIEW_REQUEST
  });
  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/cpanel/dashboard/`, config)
    .then(res => {
      dispatch({
        type: DASHBOARD_OVERVIEW_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: DASHBOARD_OVERVIEW_FAILED
      });
    });
};

export const loadAllUsers = page => (dispatch, getState) => {
  if (page === 1) {
    dispatch({
      type: ALLUSER_LOAD_REQUEST
    });
  } else if (page === 2) {
    dispatch({
      type: ALLUSER_UPDATE_REQUEST
    });
  }

  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/cpanel/allusers/${page}`, config)
    .then(res => {
      dispatch({
        type: ALLUSER_LOAD_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ALLUSER_LOAD_FAILED
      });
    });
};

export const loadAllIssues = () => (dispatch, getState) => {
  dispatch({
    type: ALL_ISSUES_LOAD_REQUEST
  });
  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/cpanel/allissues/`, config)
    .then(res => {
      dispatch({
        type: ALL_ISSUES_LOAD_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ALL_ISSUES_LOAD_FAILED
      });
    });
};

export const loadAllSupportMessages = page => (dispatch, getState) => {
  if (page === 1) {
    dispatch({
      type: ALL_MESSAGE_LOAD_REQUEST
    });
  } else if (page === 2) {
    dispatch({
      type: ALL_MESSAGE_UPDATE_REQUEST
    });
  }
  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/cpanel/allsuportmessages/${page}`, config)
    .then(res => {
      dispatch({
        type: ALL_MESSAGE_LOAD_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ALL_MESSAGE_LOAD_FAILED
      });
    });
};
