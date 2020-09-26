import { all } from 'redux-saga/effects';

import auth from './auth/sagas.js';
import user from './user/sagas.js';

export default function* rootSaga() {
  return yield all([auth, user]);
}
