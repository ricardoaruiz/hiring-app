import * as userService from '../../services/user.serivice';

export const UsersActions = {
  LOGIN: 'LOGIN',
};

export const login = () => (dispatch) => {
  // TODO fazer os tratamentos de possívies erros
  userService.getLoggedUser()
    .then((user) => {
      dispatch({
        type: UsersActions.LOGIN,
        payload: user,
      });
    });
};
