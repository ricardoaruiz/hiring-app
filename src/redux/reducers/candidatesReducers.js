import { CandidatesActions } from '../actions/candidatesActions';

const INITIAL_STATE = {
  all: {
    currentPage: 0,
    data: [],
  },
  attended: {
    currentPage: 0,
    data: [],
  },
  trash: {
    currentPage: 0,
    data: [],
  },
  searchTerm: '',
  loading: false,
};

const candidates = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CandidatesActions.LIST:
      return {
        ...state,
        searchTerm: '',
        all: {
          currentPage: payload.currentPage,
          data: [...state.all.data, ...payload.data],
        },
      };
    case CandidatesActions.CHANGE_STATE:
      return payload;
    case CandidatesActions.CHANGE_SEARCH_TERM:
      return { ...state, searchTerm: payload };
    case CandidatesActions.SET_IS_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
};

export default candidates;
