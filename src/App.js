import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  Index,
  SignupView,
  LoginView,
  LogoutView,
  // EduIndex,
  SubjectView,
  FolderView,
  ContentView,
  // MCQBankView,
  MCQExamType,
  MCQExamList,
  MCQExam,
  SubjectWiseExam,
  ProfileView,
  ProfileUpdate,
  Dashboard,
  DashboardMCQItemView,
  // DraftList,
  // DraftView,
  PolicyView,
  TermsView,
  ErrorView,
  DraftRootView,
  DirectoryView,
  ArticleView,
  PasswordResetRequest,
  PasswordResetVerify,
  AccountVerification
} from "./pages/views";

import drafting from "./pages/drafting/drafting/drafting";
import SearchCases from "./pages/drafting/components/search cases/cases.search.form.component";

import { loadUser } from "./controller/actions/auth";
import { Provider } from "react-redux";
import store from "./controller/store";

import Career from "./pages/article/career";
import ContactForm from "./pages/article/contact";

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/signup" component={SignupView} />
            <Route exact path="/logout" component={LogoutView} />
            <Route exact path="/profile" component={ProfileView} />
            <Route exact path="/profile/update/" component={ProfileUpdate} />
            <Route path="/dashboard">
              <Route exact path="/dashboard" component={Dashboard} />
              <Route
                exact
                path="/dashboard/mcq/:uid"
                component={DashboardMCQItemView}
              />
            </Route>
            <Route exact path="/career" component={Career} />
            <Route exact path="/contact" component={ContactForm} />

            <Route path="/edu">
              {/* <Route exact path="/edu" component={EduIndex} /> */}
              <Route exact path="/edu/notes" component={SubjectView} />
              <Route path="/edu/notes/folder" component={FolderView} />
              <Route path="/edu/notes/content" component={ContentView} />
              {/* <Route path="/edu/ques/mcq" component={MCQBankView} /> */}

              <Route
                exact
                path="/edu/exam/mcq/types/"
                component={MCQExamType}
              />
              <Route
                exact
                path="/edu/exam/mcq/public/"
                component={MCQExamList}
              />
              <Route
                exact
                path="/edu/exam/mcq/subjectwise/"
                component={SubjectWiseExam}
              />
              <Route exact path="/edu/exam/mcq/view/:id/" component={MCQExam} />
            </Route>

            <Route exact path="/privacy-policy" component={PolicyView} />
            <Route exact path="/terms" component={TermsView} />

            <Route exact path="/drafting/" component={drafting} />
            <Route
              exact
              path="/drafting/directory/"
              component={DirectoryView}
            />
            <Route exact path="/drafting/article/" component={ArticleView} />

            <Route path="/password-reset">
              <Route
                exact
                path="/password-reset/request/"
                component={PasswordResetRequest}
              />
              <Route
                exact
                path="/password-reset"
                component={PasswordResetVerify}
              />
            </Route>

            <Route
              exact
              path="/account-verify/"
              component={AccountVerification}
            />
            <Route path="/drafting/cases" component={SearchCases} />
            {/* 
            <Route exact path="/drafting/" component={DraftList} />
            <Route exact path="/drafting/:uid/" component={DraftView} /> */}

            <Route path="*" component={ErrorView} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
