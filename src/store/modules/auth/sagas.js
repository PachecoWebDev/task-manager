import { all, takeLatest, put } from 'redux-saga/effects';

import history from '../../../utils/history';

import { signInSuccess, singFailure } from './actions.js';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const userEmail = localStorage.getItem('@TaskUser:email');
    const userPassword = localStorage.getItem('@TaskUser:password');

    if (email !== userEmail || password !== userPassword) {
      console.log('error');
      return;
    }
    console.log('success');

    const user = 'Anderson';
    // const user = localStorage.getItem(JSON.parse('@Tasks:user'));

    yield put(signInSuccess(user));

    history.push('dashboard');
  } catch (err) {
    yield put(singFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, birth, cpf, cep, address, number, password } = payload;

    localStorage.setItem('@TaskUser:name', name);
    localStorage.setItem('@TaskUser:email', email);
    localStorage.setItem('@TaskUser:birth', birth);
    localStorage.setItem('@TaskUser:cpf', cpf);
    localStorage.setItem('@TaskUser:cep', cep);
    localStorage.setItem('@TaskUser:address', address);
    localStorage.setItem('@TaskUser:number', number);
    localStorage.setItem('@TaskUser:password', password);

    history.push('/login');
  } catch (err) {
    yield put(singFailure());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp)
]);
