class AlreadyExistsException extends Error {
  constructor () {
    super('Entity already exist');
  }
}

export default AlreadyExistsException;
