import messages from '../utils/messages';

class ClientError extends Error {
  constructor(message, statusCode = messages.HTTP.ERROR.CODE.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

export default ClientError;
