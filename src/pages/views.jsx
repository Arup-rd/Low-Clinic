import { default as Index } from "./index";

import { default as LoginView } from "./auth/login";
import { default as SignupView } from "./auth/signup";
import { default as LogoutView } from "./auth/logout";

import { default as EduIndex } from "./edu/index";
import { default as SubjectView } from "./edu/notes/subjects";
import { default as FolderView } from "./edu/notes/folder";
import { default as ContentView } from "./edu/notes/content";

import { default as MCQBankView } from "./edu/ques/mcq";

import { default as MCQExamType } from "./edu/exam/examtype";
import { default as MCQExamList } from "./edu/exam/list";
import { default as MCQExam } from "./edu/exam/single";
import { default as SubjectWiseExam } from "./edu/exam/subjectwise";

import { default as Dashboard } from "./admin/Index";
import { default as DashboardMCQItemView } from "./admin/components/mcqitem";

import { default as ProfileView } from "./user/profile";
import { default as ProfileUpdate } from "./user/update/container";

import { default as DirectoryView } from "./drafting/directory";
import { default as ArticleView } from "./drafting/article";
import { default as DraftRootView } from "./drafting/root";

import { default as PolicyView } from "./article/privacy";
import { default as TermsView } from "./article/terms";

import { default as PasswordResetRequest } from "./reset/request";
import { default as PasswordResetVerify } from "./reset/verify";

import { default as AccountVerification } from "./auth/verify";

import { default as ErrorView } from "./error";

export {
  Index,
  SignupView,
  LoginView,
  LogoutView,
  EduIndex,
  SubjectView,
  FolderView,
  ContentView,
  MCQBankView,
  MCQExamType,
  MCQExamList,
  MCQExam,
  SubjectWiseExam,
  ProfileView,
  ProfileUpdate,
  DirectoryView,
  ArticleView,
  DraftRootView,
  Dashboard,
  DashboardMCQItemView,
  PolicyView,
  TermsView,
  PasswordResetRequest,
  PasswordResetVerify,
  AccountVerification,
  ErrorView
};
