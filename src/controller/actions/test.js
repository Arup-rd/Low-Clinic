import {
  MCQ_ITEM_LOAD_REQUEST,
  MCQ_ITEM_LOAD_SUCCESS,
  MCQ_ITEM_LOAD_FAILED
} from "../reducers/test";
import axios from "axios";
import { SERVER } from "./config";

export const loadTest = () => dispatch => {
  dispatch({
    type: MCQ_ITEM_LOAD_REQUEST
  });

  const obj = {
    question: "This is a questFSAFG uPDATED",
    option1: "A opfdfn",
    option2: "B optiaein",
    option3: "Casfdj",
    option4: "D optionasf",
    answer: 2,
    summary: "This is an updated summary",
    icon: "edit"
  };

  axios
    .get(`${SERVER}/api/exam/public-mcq-exams/`, null)
    .then(res => {
      dispatch({
        type: MCQ_ITEM_LOAD_SUCCESS,
        payload: obj
      });
    })
    .catch(err => {
      dispatch({
        type: MCQ_ITEM_LOAD_FAILED
      });
      console.log(err);
    });
};
