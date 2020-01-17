export const DIRECTORY_CREATE_REQUEST = "DIRECTORY_CREATE_REQUEST";
export const DIRECTORY_CREATE_SUCCESS = "DIRECTORY_CREATE_SUCCESS";
export const DIRECTORY_CREATE_FAILED = "DIRECTORY_CREATE_FAILED";

export const ROOT_LOAD_REQUEST = "ROOT_LOAD_REQUEST";
export const ROOT_LOAD_SUCCESS = "ROOT_LOAD_SUCCESS";
export const ROOT_LOAD_FAILED = "ROOT_LOAD_FAILED";

export const DIRECTORY_LOAD_REQUEST = "DIRECTORY_LOAD_REQUEST";
export const DIRECTORY_LOAD_SUCCESS = "DIRECTORY_LOAD_SUCCESS";
export const DIRECTORY_LOAD_FAILED = "DIRECTORY_LOAD_FAILED";

const initialState = {
  isLoading: true,
  isLoaded: false,
  isFailed: false,
  data: [],

  rootDirectory: null,

  isDirectoryCreated: false,
  isDirectoryCreating: false,
  isDirectoryCreationFailed: false,
  createdDirectory: null
};

export default function(state = initialState, action) {
  if (
    action.type === ROOT_LOAD_REQUEST ||
    action.type === DIRECTORY_LOAD_REQUEST
  ) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === ROOT_LOAD_SUCCESS) {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
      isLoaded: true
    };
  }

  if (action.type === DIRECTORY_LOAD_SUCCESS) {
    return {
      ...state,
      data: action.payload.allDirectories.edges,
      rootDirectory: action.payload.directory,
      isLoading: false,
      isLoaded: true
    };
  }
  if (
    action.type === DIRECTORY_LOAD_FAILED ||
    action.type === ROOT_LOAD_FAILED
  ) {
    return {
      ...state,
      isLoading: false,
      isFailed: true
    };
  }
  if (action.type === DIRECTORY_CREATE_REQUEST) {
    return {
      ...state,
      isDirectoryCreating: true
    };
  }
  if (action.type === DIRECTORY_CREATE_SUCCESS) {
    const item = {
      node: {
        ...action.payload
      }
    };
    state.data.push(item);
    return {
      ...state,
      isDirectoryCreating: false,
      isDirectoryCreated: true,
      createdDirectory: item
    };
  }
  if (action.type === DIRECTORY_CREATE_FAILED) {
    return {
      ...state,
      isDirectoryCreating: false,
      isDirectoryCreationFailed: true
    };
  }
  return state;
}
