import * as candidatesService from '../../services/candidate.services';

export const CandidatesActions = {
  LIST: 'LIST',
  CHANGE_STATE: 'CHANGE_STATE',
  CHANGE_SEARCH_TERM: 'CHANGE_SEARCH_TERM',
  SET_IS_LOADING: 'SET_IS_LOADING',
};

export const setIsLoading = (isLoading) => ({
  type: CandidatesActions.SET_IS_LOADING,
  payload: isLoading,
});

export const listAllFromApi = ({ results }) => (dispatch, getState) => {
  const type = 'all';
  const { candidates } = getState();
  const page = candidates.all.currentPage + 1;

  dispatch(setIsLoading(true));
  // TODO fazer os tratamentos de possívies erros
  candidatesService.getCandidates(
    { type, page, results },
  ).then((candidatesFromApi) => {
    dispatch({
      type: CandidatesActions.LIST,
      payload: candidatesFromApi,
    });
  }).finally(() => {
    dispatch(setIsLoading(false));
  });
};

export const changeSearchTerm = (searchTerm) => ({
  type: CandidatesActions.CHANGE_SEARCH_TERM,
  payload: searchTerm,
});

export const sendToTrash = (id) => (dispatch, getState) => {
  const { candidates } = getState();

  const all = { ...candidates.all };
  const attended = { ...candidates.attended };
  const trash = { ...candidates.trash };

  const candidateInAll = all.data.find((candidate) => candidate._id === id);
  const candidateInAttended = !candidateInAll && attended.data.find(
    (candidate) => candidate._id === id,
  );

  if (candidateInAll) {
    const index = all.data.indexOf(candidateInAll);
    all.data.splice(index, 1);
    trash.data.push(candidateInAll);
  }
  if (candidateInAttended) {
    const index = attended.data.indexOf(candidateInAttended);
    attended.data.splice(index, 1);
    trash.data.push(candidateInAttended);
  }

  dispatch({
    type: CandidatesActions.CHANGE_STATE,
    payload: { all, attended, trash },
  });
};

export const sendToAttended = (id) => (dispatch, getState) => {
  const { candidates } = getState();

  const all = { ...candidates.all };
  const attended = { ...candidates.attended };
  const trash = { ...candidates.trash };

  const candidateInAll = all.data.find((candidate) => candidate._id === id);
  const candidateInTrash = !candidateInAll && trash.data.find(
    (candidate) => candidate._id === id,
  );

  if (candidateInAll) {
    const index = all.data.indexOf(candidateInAll);
    all.data.splice(index, 1);
    attended.data.push(candidateInAll);
  }
  if (candidateInTrash) {
    const index = trash.data.indexOf(candidateInTrash);
    trash.data.splice(index, 1);
    attended.data.push(candidateInTrash);
  }

  dispatch({
    type: CandidatesActions.CHANGE_STATE,
    payload: { all, attended, trash },
  });
};

export const sendToAll = (id) => (dispatch, getState) => {
  const { candidates } = getState();

  const all = { ...candidates.all };
  const attended = { ...candidates.attended };
  const trash = { ...candidates.trash };

  const candidateInAttended = attended.data.find((candidate) => candidate._id === id);
  const candidateInTrash = !candidateInAttended && trash.data.find(
    (candidate) => candidate._id === id,
  );

  if (candidateInAttended) {
    const index = attended.data.indexOf(candidateInAttended);
    attended.data.splice(index, 1);
    all.data.push(candidateInAttended);
  }
  if (candidateInTrash) {
    const index = trash.data.indexOf(candidateInTrash);
    trash.data.splice(index, 1);
    all.data.push(candidateInTrash);
  }

  dispatch({
    type: CandidatesActions.CHANGE_STATE,
    payload: { all, attended, trash },
  });
};
