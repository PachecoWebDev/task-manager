import { combineReducers } from 'redux';

import auth from './auth/reducer.js';
import user from './user/reducer.js';

export default combineReducers({ auth, user });
