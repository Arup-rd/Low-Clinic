import axios from "axios";
import {
  PUBLIC_MCQ_EXAMS_LOAD_REQUEST,
  PUBLIC_MCQ_EXAMS_LOAD_SUCCESS,
  PUBLIC_MCQ_EXAMS_LOAD_FAILED,
  MCQ_EXAM_CREATE_REQUEST,
  MCQ_EXAM_CREATE_SUCCESS,
  MCQ_EXAM_CREATE_FAILED,
  USER_EXAMS_LOAD_FAILED,
  USER_EXAMS_LOAD_SUCCESS,
  MCQ_EXAM_REPORT_REQUEST,
  MCQ_EXAM_REPORT_FAILED,
  MCQ_EXAM_REPORT_SUCCESS,
  MCQ_EXAM_PREVIEW_lOAD_REQUEST,
  MCQ_EXAM_PREVIEW_LOAD_SUCCESS,
  MCQ_EXAM_PREVIEW_LOAD_FAILED,
  MCQ_EXAM_SHEET_REQUEST,
  MCQ_EXAM_SHEET_SUCCESS,
  MCQ_EXAM_SHEET_FAILED,
  EXAM_SUBMIT_REQUEST,
  EXAM_SUBMIT_SUCCESS,
  EXAM_SUBMIT_FAILED,
  USER_EXAMS_LOAD_REQUEST,
  PUBLIC_MCQ_EXAMS_UPDATE_REQUEST,
  PUBLIC_MCQ_EXAMS_UPDATE_SUCCESS,
  PUBLIC_MCQ_EXAMS_UPDATE_FAILED
} from "../reducers/exam";
import { LOG_FAILED } from "../reducers/auth";
import { SERVER, accessConfig } from "./config";

export const loadPublicMCQExams = (after = null) => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: after
      ? PUBLIC_MCQ_EXAMS_UPDATE_REQUEST
      : PUBLIC_MCQ_EXAMS_LOAD_REQUEST
  });

  const config = accessConfig(getState());
  let url = `${SERVER}/api/exam/public-mcq-exams/`;
  if (after) {
    url = `${url}?after=${after}`;
  }
  axios
    .get(url, config)
    .then(res => {
      dispatch({
        type: after
          ? PUBLIC_MCQ_EXAMS_UPDATE_SUCCESS
          : PUBLIC_MCQ_EXAMS_LOAD_SUCCESS,
        payload: res.data.allMcqExams
      });
    })
    .catch(err => {
      dispatch({
        type: after
          ? PUBLIC_MCQ_EXAMS_UPDATE_FAILED
          : PUBLIC_MCQ_EXAMS_LOAD_FAILED
      });
    });
};

export const loadMCQExamPreview = uid => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: MCQ_EXAM_PREVIEW_lOAD_REQUEST
  });

  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/exam/mcq/?uid=${uid}`, config)
    .then(res => {
      dispatch({
        type: MCQ_EXAM_PREVIEW_LOAD_SUCCESS,
        payload: res.data.mcqExam
      });
    })
    .catch(err => {
      dispatch({
        type: MCQ_EXAM_PREVIEW_LOAD_FAILED
      });
      console.log(err.response);
    });
};

export const loadMCQExamSheet = uid => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: MCQ_EXAM_SHEET_REQUEST
  });

  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/exam/mcq/sheet/${uid}/`, config)
    .then(res => {
      dispatch({
        type: MCQ_EXAM_SHEET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: MCQ_EXAM_SHEET_FAILED
      });
    });
};

export const createMCQExam = (data, subjects) => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: MCQ_EXAM_CREATE_REQUEST
  });

  let formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  for (const key in subjects) {
    formData.append("subjects", subjects[key].value);
  }

  const config = accessConfig(getState());
  axios
    .post(`${SERVER}/api/exam/mcq/`, formData, config)
    .then(res => {
      dispatch({
        type: MCQ_EXAM_CREATE_SUCCESS,
        payload: res.data.mcqExam
      });
    })
    .catch(err => {
      dispatch({
        type: MCQ_EXAM_CREATE_FAILED
      });
      console.log(err);
    });
};

export const loadUserExams = () => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: USER_EXAMS_LOAD_REQUEST
  });

  const config = accessConfig(getState());
  axios
    .get(`${SERVER}/api/exam/mcq/mylist/`, config)
    .then(res => {
      dispatch({
        type: USER_EXAMS_LOAD_SUCCESS,
        payload: res.data.allMcqExams.edges
      });
    })
    .catch(err => {
      dispatch({
        type: USER_EXAMS_LOAD_FAILED
      });
      console.log(err.response);
    });
};

export const submitExam = obj => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: EXAM_SUBMIT_REQUEST
  });

  const data = JSON.stringify(obj);
  var config = accessConfig(getState());
  config.headers["Content-Type"] = "application/json";

  axios
    .post(`${SERVER}/api/exam/mcq/report/`, data, config)
    .then(res => {
      dispatch({
        type: EXAM_SUBMIT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: EXAM_SUBMIT_FAILED
      });
    });
};

export const loadMCQExamReport = uid => (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) {
    dispatch({
      type: LOG_FAILED
    });
    return;
  }

  dispatch({
    type: MCQ_EXAM_REPORT_REQUEST
  });

  var config = accessConfig(getState());

  axios
    .get(`${SERVER}/api/exam/mcq/report/?uid=${uid}`, config)
    .then(res => {
      dispatch({
        type: MCQ_EXAM_REPORT_SUCCESS,
        payload: res.data.mcqExam
      });
    })
    .catch(err => {
      dispatch({
        type: MCQ_EXAM_REPORT_FAILED
      });
    });
};
