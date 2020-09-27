import { all, takeLatest, put } from 'redux-saga/effects';

import history from '../../../utils/history';

import { signInSuccess, singFailure } from './actions.js';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const storagedUsers = JSON.parse(localStorage.getItem("@taskUsers"));

    const logUser = storagedUsers.filter(user => user.email === email && user.password === password);

    if (logUser.length > 0) {
      yield put(signInSuccess(logUser[0]));

      history.push('dashboard');
    }
  } catch (err) {
    yield put(singFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { id, name, email, birth, cpf, cep, address, number, password } = payload;
    const user = {
      id,
      name,
      email,
      birth,
      cpf,
      cep,
      address,
      number,
      password,
    };

    const users = [user];

    if (localStorage.hasOwnProperty("@taskUsers")) {
      const storagedUsers = JSON.parse(localStorage.getItem("@taskUsers"));
      storagedUsers.push(user);
      localStorage.setItem("@taskUsers", JSON.stringify(storagedUsers));

    } else {
      localStorage.setItem("@taskUsers", JSON.stringify(users));
    }

    history.push('/login');
  } catch (err) {
    yield put(singFailure());
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
