export function signInRequest({ email, password }) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signUpRequest({ id, name, email, birth, cpf, cep, address, number, password }) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { id, name, email, birth, cpf, cep, address, number, password },
  };
}

export function signInSuccess(user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { user },
  };
}

export function singFailure() {
  return {
    type: '@uth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
