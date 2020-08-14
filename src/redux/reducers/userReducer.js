import { UsersActions } from '../actions/userActions';

const INITIAL_STATE = {
  isLogged: false,
  image: '',
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case UsersActions.LOGIN:
      return { isLogged: true, image: payload.image };
    default:
      return state;
  }
};
