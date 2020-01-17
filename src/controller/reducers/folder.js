export const FOLDER_CREATE_REQUEST = "FOLDER_CREATE_REQUEST";
export const FOLDER_CREATE_SUCCESS = "FOLDER_CREATE_SUCCESS";
export const FOLDER_CREATE_FAILED = "FOLDER_CREATE_FAILED";

export const SUBJECT_LOAD_REQUEST = "SUBJECT_LOAD_REQUEST";
export const SUBJECT_LOAD_SUCCESS = "SUBJECT_LOAD_SUCCESS";
export const SUBJECT_LOAD_FAILED = "SUBJECT_LOAD_FAILED";

export const FOLDER_LOAD_REQUEST = "FOLDER_LOAD_REQUEST";
export const FOLDER_LOAD_SUCCESS = "FOLDER_LOAD_SUCCESS";
export const FOLDER_LOAD_FAILED = "FOLDER_LOAD_FAILED";

const initialState = {
  isLoading: true,
  isLoaded: false,
  isFailed: false,
  data: [],

  rootFolder: null,

  isFolderCreated: false,
  isFolderCreating: false,
  isFolderCreationFailed: false,
  createdFolder: null
};

export default function(state = initialState, action) {
  if (
    action.type === SUBJECT_LOAD_REQUEST ||
    action.type === FOLDER_LOAD_REQUEST
  ) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === SUBJECT_LOAD_SUCCESS) {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
      isLoaded: true
    };
  }

  if (action.type === FOLDER_LOAD_SUCCESS) {
    return {
      ...state,
      data: action.payload.allFolders.edges,
      rootFolder: action.payload.folder,
      isLoading: false,
      isLoaded: true
    };
  }
  if (
    action.type === FOLDER_LOAD_FAILED ||
    action.type === SUBJECT_LOAD_FAILED
  ) {
    return {
      ...state,
      isLoading: false,
      isFailed: true
    };
  }
  if (action.type === FOLDER_CREATE_REQUEST) {
    return {
      ...state,
      isFolderCreating: true
    };
  }
  if (action.type === FOLDER_CREATE_SUCCESS) {
    const item = {
      node: {
        ...action.payload
      }
    };
    state.data.push(item);
    return {
      ...state,
      isFolderCreating: false,
      isFolderCreated: true,
      createdFolder: item
    };
  }
  if (action.type === FOLDER_CREATE_FAILED) {
    return {
      ...state,
      isFolderCreating: false,
      isFolderCreationFailed: true
    };
  }
  return state;
}
