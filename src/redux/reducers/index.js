import { combineReducers } from 'redux';

import user from './userReducer';
import candidates from './candidatesReducers';

export default combineReducers({
  user,
  candidates,
});
