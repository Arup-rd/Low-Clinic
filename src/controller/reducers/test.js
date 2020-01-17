export const MCQ_ITEM_LOAD_REQUEST = "mcq_item_load_request";
export const MCQ_ITEM_LOAD_SUCCESS = "mcq_item_load_success";
export const MCQ_ITEM_LOAD_FAILED = "mcq_item_load_failed";

const initialState = {
  isLoading: false,
  isLoaded: false,
  isFailed: false,

  data: null
};

export default function(state = initialState, action) {
  if (action.type === MCQ_ITEM_LOAD_REQUEST) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === MCQ_ITEM_LOAD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      data: action.payload
    };
  }
  if (action.type === MCQ_ITEM_LOAD_FAILED) {
    return {
      ...state,
      isLoading: false,
      isFailed: true
    };
  }
  return state;
}
