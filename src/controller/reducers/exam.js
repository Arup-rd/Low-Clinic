export const PUBLIC_MCQ_EXAMS_LOAD_REQUEST = "PUBLIC_MCQ_EXAMS_LOAD_REQUEST";
export const PUBLIC_MCQ_EXAMS_LOAD_SUCCESS = "PUBLIC_MCQ_EXAMS_LOAD_SUCCESS";
export const PUBLIC_MCQ_EXAMS_LOAD_FAILED = "PUBLIC_MCQ_EXAMS_LOAD_FAILED";

export const PUBLIC_MCQ_EXAMS_UPDATE_FAILED = "PUBLIC_MCQ_EXAMS_UPDATE_FAILED";
export const PUBLIC_MCQ_EXAMS_UPDATE_SUCCESS =
  "PUBLIC_MCQ_EXAMS_UPDATE_SUCCESS";
export const PUBLIC_MCQ_EXAMS_UPDATE_REQUEST =
  "PUBLIC_MCQ_EXAMS_UPDATE_REQUEST";

export const MCQ_EXAM_PREVIEW_lOAD_REQUEST = "MCQ_EXAM_PREVIEW_lOAD_REQUEST";
export const MCQ_EXAM_PREVIEW_LOAD_SUCCESS = "MCQ_EXAM_PREVIEW_LOAD_SUCCESS";
export const MCQ_EXAM_PREVIEW_LOAD_FAILED = "MCQ_EXAM_PREVIEW_LOAD_FAILED";

export const MCQ_EXAM_SHEET_REQUEST = "MCQ_EXAM_SHEET_REQUEST";
export const MCQ_EXAM_SHEET_FAILED = "MCQ_EXAM_SHEET_FAILED";
export const MCQ_EXAM_SHEET_SUCCESS = "MCQ_EXAM_SHEET_SUCCESS";

export const MCQ_EXAM_CREATE_REQUEST = "CQ_EXAM_CREATE_REQUEST";
export const MCQ_EXAM_CREATE_SUCCESS = "MCQ_EXAM_CREATE_SUCCESS";
export const MCQ_EXAM_CREATE_FAILED = "MCQ_EXAM_CREATE_FAILED";

export const USER_EXAMS_LOAD_REQUEST = "USER_EXAMS_LOAD_REQUEST";
export const USER_EXAMS_LOAD_SUCCESS = "USER_EXAMS_LOAD_SUCCESS";
export const USER_EXAMS_LOAD_FAILED = "USER_EXAMS_LOAD_FAILED";

export const EXAM_SUBMIT_REQUEST = "EXAM_SUBMIT_REQUEST";
export const EXAM_SUBMIT_SUCCESS = "EXAM_SUBMIT_SUCCESS";
export const EXAM_SUBMIT_FAILED = "EXAM_SUBMIT_FAILED";

export const MCQ_EXAM_REPORT_REQUEST = "MCQ_EXAM_REPORT_REQUEST";
export const MCQ_EXAM_REPORT_FAILED = "MCQ_EXAM_REPORT_FAILED";
export const MCQ_EXAM_REPORT_SUCCESS = "MCQ_EXAM_REPORT_SUCCESS";

const iniitalState = {
  isLoaded: false,
  isLoading: false,
  isFailed: false,
  previewData: null,

  isExamSubmitRequestLoading: false,
  isExamSubmitRequestSuccess: false,
  isExamSubmitRequestFailed: false,

  isExamSheetLoading: false,
  isExamSheetLoadFailed: false,
  isExamSheetLoadSuccess: false,
  examSheetData: [],
  examDuration: -1,

  isCreated: false,
  isCreating: false,
  isCreationFailed: false,

  isUserExamsLoading: false,
  isUserExamsLoaded: false,
  isUserExamesLoadFailed: false,

  isReportLoading: false,
  isReportLoaded: false,
  isReportLoadFailed: false,

  list: [],
  listPageInfo: null,
  userExams: [],

  isListUpdating: false,
  isListUpdateSuccess: false,
  isListUpdateFailed: false,

  report: null
};

export default function(state = iniitalState, action) {
  if (
    action.type === PUBLIC_MCQ_EXAMS_LOAD_REQUEST ||
    action.type === MCQ_EXAM_PREVIEW_lOAD_REQUEST
  ) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === PUBLIC_MCQ_EXAMS_LOAD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      list: action.payload.edges,
      listPageInfo: action.payload.pageInfo
    };
  }

  if (
    action.type === PUBLIC_MCQ_EXAMS_LOAD_FAILED ||
    action.type === MCQ_EXAM_PREVIEW_LOAD_FAILED
  ) {
    return {
      ...state,
      isLoading: false,
      isFailed: true
    };
  }

  if (action.type === PUBLIC_MCQ_EXAMS_UPDATE_REQUEST) {
    return {
      ...state,
      isListUpdating: true
    };
  }

  if (action.type === PUBLIC_MCQ_EXAMS_UPDATE_SUCCESS) {
    return {
      ...state,
      isListUpdateSuccess: true,
      isListUpdating: false,
      list: state.list.concat(action.payload.edges),
      listPageInfo: action.payload.pageInfo
    };
  }
  if (action.type === PUBLIC_MCQ_EXAMS_UPDATE_FAILED) {
    return {
      ...state,
      isListUpdating: false,
      isListUpdateFailed: true
    };
  }

  if (action.type === MCQ_EXAM_PREVIEW_LOAD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      previewData: action.payload
    };
  }

  if (action.type === EXAM_SUBMIT_REQUEST) {
    return {
      ...state,
      isExamSubmitRequestLoading: true
    };
  }
  if (action.type === EXAM_SUBMIT_SUCCESS) {
    return {
      ...state,
      isExamSubmitRequestLoading: false,
      isExamSubmitRequestSuccess: true
    };
  }
  if (action.type === EXAM_SUBMIT_FAILED) {
    return {
      ...state,
      isExamSubmitRequestLoading: false,
      isExamSubmitRequestFailed: true
    };
  }

  if (action.type === MCQ_EXAM_REPORT_REQUEST) {
    return {
      ...state,
      isReportLoading: true
    };
  }

  if (action.type === MCQ_EXAM_REPORT_SUCCESS) {
    return {
      ...state,
      isReportLoading: false,
      isReportLoaded: true,
      report: action.payload
    };
  }

  if (action.type === MCQ_EXAM_REPORT_FAILED) {
    return {
      ...state,
      isReportLoading: false,
      isReportLoadFailed: true
    };
  }

  if (action.type === MCQ_EXAM_CREATE_REQUEST) {
    return {
      ...state,
      isCreating: true
    };
  }

  if (action.type === MCQ_EXAM_CREATE_SUCCESS) {
    return {
      ...state,
      isCreating: false,
      isCreated: true,
      previewData: action.payload
    };
  }
  if (action.type === MCQ_EXAM_CREATE_FAILED) {
    return {
      ...state,
      isCreating: false,
      isCreationFailed: true
    };
  }

  if (action.type === USER_EXAMS_LOAD_REQUEST) {
    return {
      ...state,
      isUserExamsLoading: true
    };
  }

  if (action.type === USER_EXAMS_LOAD_SUCCESS) {
    return {
      ...state,
      isUserExamsLoading: false,
      isUserExamsLoaded: true,
      userExams: action.payload
    };
  }

  if (action.type === USER_EXAMS_LOAD_FAILED) {
    return {
      ...state,
      isUserExamsLoading: false,
      isUserExamesLoadFailed: true
    };
  }

  if (action.type === MCQ_EXAM_SHEET_REQUEST) {
    return {
      ...state,
      isExamSheetLoading: true
    };
  }

  if (action.type === MCQ_EXAM_SHEET_SUCCESS) {
    return {
      ...state,
      isExamSheetLoading: false,
      isExamSheetLoadSuccess: true,
      examSheetData: action.payload.mcqExam.source.mcqexamitemSet.edges,
      examDuration: action.payload.mcqExam.source.duration
    };
  }

  if (action.type === MCQ_EXAM_SHEET_FAILED) {
    return {
      ...state,
      isExamSheetLoading: false,
      isExamSheetLoadFailed: true
    };
  }

  return state;
}
