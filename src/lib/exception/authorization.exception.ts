class AuthorizationException extends Error {
  constructor () {
    super('Unauthorized.');
  }
}

export default AuthorizationException;
