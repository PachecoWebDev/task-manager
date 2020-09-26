export function signInRequest({ email, password }) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signUpRequest({ name, email, birth, cpf, cep, address, number, password }) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, birth, cpf, cep, address, number, password },
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
