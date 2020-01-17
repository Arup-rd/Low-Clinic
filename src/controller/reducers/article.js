export const ARTICLE_LOAD_REQUEST = "ARTICLE_LOAD_REQUEST";
export const ARTICLE_LOAD_SUCCESS = "ARTICLE_LOAD_SUCCESS";
export const ARTICLE_LOAD_FAILED = "ARTICLE_LOAD_FAILED";

export const ARTICLE_CREATE_REQUEST = "ARTICLE_CREATE_REQUEST";
export const ARTICLE_CREATE_SUCCESS = "ARTICLE_CREATE_SUCCESS";
export const ARTICLE_CREATE_FAILED = "ARTICLE_CREATE_FAILED";

const initialState = {
  isLoading: false,
  isLoaded: false,
  isFailed: false,
  articleObject: null,

  isArticleCreated: false,
  isArticleCreating: false,
  isArticleCreationFailed: false,
  createdArticle: null
};

export default function(state = initialState, action) {
  if (action.type === ARTICLE_LOAD_REQUEST) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === ARTICLE_LOAD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      articleObject: action.payload
    };
  }
  if (action.type === ARTICLE_LOAD_FAILED) {
    return {
      ...state,
      isLoading: false,
      isFailed: true
    };
  }
  if (action.type === ARTICLE_CREATE_REQUEST) {
    return {
      ...state,
      isArticleCreating: true
    };
  }
  if (action.type === ARTICLE_CREATE_SUCCESS) {
    return {
      ...state,
      isArticleCreating: false,
      isArticleCreated: true,
      createdArticle: action.payload
    };
  }
  if (action.type === ARTICLE_CREATE_FAILED) {
    return {
      ...state,
      isArticleCreating: false,
      isArticleCreationFailed: true
    };
  }
  return state;
}
