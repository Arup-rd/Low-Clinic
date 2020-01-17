export const POST_LOAD_REQUEST = "POST_LOAD_REQUEST";
export const POST_LOAD_SUCCESS = "POST_LOAD_SUCCESS";
export const POST_LOAD_FAILED = "POST_LOAD_FAILED";

export const POST_CREATE_REQUEST = "POST_CREATE_REQUEST";
export const POST_CREATE_SUCCESS = "POST_CREATE_SUCCESS";
export const POST_CREATE_FAILED = "POST_CREATE_FAILED";

const initialState = {
  isLoading: false,
  isLoaded: false,
  isFailed: false,
  postObject: null,

  isPostCreated: false,
  isPostCreating: false,
  isPostCreationFailed: false,
  createdPost: null
};

export default function(state = initialState, action) {
  if (action.type === POST_LOAD_REQUEST) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === POST_LOAD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      postObject: action.payload
    };
  }
  if (action.type === POST_LOAD_FAILED) {
    return {
      ...state,
      isLoading: false,
      isFailed: true
    };
  }
  if (action.type === POST_CREATE_REQUEST) {
    return {
      ...state,
      isPostCreating: true
    };
  }
  if (action.type === POST_CREATE_SUCCESS) {
    return {
      ...state,
      isPostCreating: false,
      isPostCreated: true,
      createdPost: action.payload
    };
  }
  if (action.type === POST_CREATE_FAILED) {
    return {
      ...state,
      isPostCreating: false,
      isPostCreationFailed: true
    };
  }
  return state;
}
