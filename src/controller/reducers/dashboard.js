export const DASHBOARD_OVERVIEW_REQUEST = "DASHBOARD_OVERVIEW_REQUEST";
export const DASHBOARD_OVERVIEW_FAILED = "DASHBOARD_OVERVIEW_FAILED";
export const DASHBOARD_OVERVIEW_SUCCESS = "DASHBOARD_OVERVIEW_SUCCESS";

export const ALLUSER_LOAD_REQUEST = "ALLUSER_LOAD_REQUEST";
export const ALLUSER_LOAD_SUCCESS = "ALLUSER_LOAD_SUCCESS";
export const ALLUSER_LOAD_FAILED = "ALLUSER_LOAD_FAILED";
export const ALLUSER_UPDATE_REQUEST = "ALLUSER_UPDATE_REQUEST";

export const ALL_ISSUES_LOAD_REQUEST = "ALL_ISSUES_LOAD_REQUEST";
export const ALL_ISSUES_LOAD_SUCCESS = "ALL_ISSUES_LOAD_SUCCESS";
export const ALL_ISSUES_LOAD_FAILED = "ALL_ISSUES_LOAD_FAILED";

export const ALL_MESSAGE_LOAD_REQUEST = "ALL_MESSAGE_LOAD_REQUEST";
export const ALL_MESSAGE_LOAD_SUCCESS = "ALL_MESSAGE_LOAD_SUCCESS";
export const ALL_MESSAGE_LOAD_FAILED = "ALL_MESSAGE_LOAD_FAILED";
export const ALL_MESSAGE_UPDATE_REQUEST = "ALL_MESSAGE_UPDATE_REQUEST";

const initialState = {
  isLoading: false,
  isLoaded: false,
  isFailed: false,
  isUpdating: false,

  overviewData: {
    totalAccount: 0,
    totalExam: 0,
    totalPendingIssue: 0
  },
  myUsers: [],
  issueList: [],
  supportBox: []
};

export default function(state = initialState, action) {
  if (
    action.type === DASHBOARD_OVERVIEW_REQUEST ||
    action.type === ALLUSER_LOAD_REQUEST ||
    action.type === ALL_ISSUES_LOAD_REQUEST ||
    action.type === ALL_MESSAGE_LOAD_REQUEST
  ) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === DASHBOARD_OVERVIEW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      overviewData: action.payload
    };
  }
  if (
    action.type === DASHBOARD_OVERVIEW_FAILED ||
    action.type === ALLUSER_LOAD_FAILED ||
    action.type === ALL_ISSUES_LOAD_FAILED ||
    action.type === ALL_MESSAGE_LOAD_FAILED
  ) {
    return {
      ...state,
      isLoading: false,
      isFailed: true
    };
  }
  if (
    action.type === ALLUSER_UPDATE_REQUEST ||
    action.type === ALL_MESSAGE_UPDATE_REQUEST
  ) {
    return {
      ...state,
      isUpdating: true
    };
  }
  if (action.type === ALLUSER_LOAD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      isUpdating: false,
      myUsers: state.myUsers.concat(action.payload.allAccounts)
    };
  }
  if (action.type === ALL_ISSUES_LOAD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      issueList: action.payload.allMcqIssues.edges
    };
  }
  if (action.type === ALL_MESSAGE_LOAD_SUCCESS) {
    return {
      ...state,
      isUpdating: false,
      isLoading: false,
      isLoaded: true,
      supportBox: state.supportBox.concat(action.payload)
    };
  }
  return state;
}
