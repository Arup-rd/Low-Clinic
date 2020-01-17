import { combineReducers } from "redux";
import auth from "./auth";
import folder from "./folder";
import post from "./post";
import ques from "./ques";
import exam from "./exam";
import dashboard from "./dashboard";
import drafting from "./drafting";
import article from "./article";
import reset from "./reset";

export default combineReducers({
  // postReducer : posts,
  // posts - as same name
  auth,
  folder,
  post,
  ques,
  exam,
  dashboard,
  drafting,
  article,
  reset
});
