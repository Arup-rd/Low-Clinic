export const MCQ_BANK_LIST_LOAD_REQUEST = "MCQ_BANK_LIST_LOAD_REQUEST";
export const MCQ_BANK_LIST_LOAD_SUCCESS = "MCQ_BANK_LIST_LOAD_SUCCESS";
export const MCQ_BANK_LIST_LOAD_FAILED = "MCQ_BANK_LIST_LOAD_FAILED";

export const MCQ_ITEM_LOAD_REQUEST = "MCQ_ITEM_LOAD_REQUEST";
export const MCQ_ITEM_LOAD_SUCCESS = "MCQ_ITEM_LOAD_SUCCESS";
export const MCQ_ITEM_LOAD_FAILED = "MCQ_ITEM_LOAD_FAILED";

export const MCQ_ITEM_UPDATE_REQUEST = "MCQ_ITEM_UPDATE_REQUEST";
export const MCQ_ITEM_UPDATE_SUCCESS = "MCQ_ITEM_UPDATE_SUCCESS";
export const MCQ_ITEM_UPDATE_FAILED = "MCQ_ITEM_UPDATE_FAILED";

const initialState = {
  isListLoading: false,
  isListLoaded: false,
  isListFailed: false,
  questionList: [],
  questionListPageInfo: null,
  questionObj: null,

  isItemLoading: false,
  isItemLoaded: false,
  isItemLoadFailed: false,
  isItemUpdating: false,
  isItemUpdated: false,
  isItemUpdateFailed: false,
  mcqItem: null
};

export default function(state = initialState, action) {
  if (action.type === MCQ_BANK_LIST_LOAD_REQUEST) {
    return {
      ...state,
      isListLoading: true
    };
  }
  if (action.type === MCQ_BANK_LIST_LOAD_SUCCESS) {
    return {
      ...state,
      isListLoading: false,
      isListLoaded: true,
      questionList: action.payload.edges,
      questionListPageInfo: action.payload.pageInfo
    };
  }
  if (action.type === MCQ_BANK_LIST_LOAD_FAILED) {
    return {
      ...state,
      isListLoading: false,
      isListFailed: true
    };
  }

  if (action.type === MCQ_ITEM_LOAD_REQUEST) {
    return {
      ...state,
      isItemLoading: true
    };
  }

  if (action.type === MCQ_ITEM_LOAD_SUCCESS) {
    return {
      ...state,
      isItemLoading: false,
      isItemLoaded: true,
      mcqItem: action.payload.mcq
    };
  }

  if (action.type === MCQ_ITEM_LOAD_FAILED) {
    return {
      ...state,
      isItemLoading: false,
      isItemLoadFailed: true
    };
  }

  if (action.type === MCQ_ITEM_UPDATE_REQUEST) {
    return {
      ...state,
      isItemUpdating: true
    };
  }

  if (action.type === MCQ_ITEM_UPDATE_SUCCESS) {
    return {
      ...state,
      isItemUpdating: false,
      isItemUpdated: true,
      mcqItem: action.payload.mcq
    };
  }

  if (action.type === MCQ_ITEM_UPDATE_FAILED) {
    return {
      ...state,
      isItemUpdating: false,
      isItemUpdateFailed: true
    };
  }

  return state;
}
