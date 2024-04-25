import ClientError from '../../exceptions/ClientError.js';
import {
  BookPayloadSchema,
  BookIdPayloadSchema,
  BookPayloadUpdateSchema,
} from './schema.js';

const BookValidator = {
  validateBookPayload: (payload) => {
    const validationResult = BookPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new ClientError(validationResult.error.message);
    }
  },
  validateBookId: (bookId) => {
    const validationResult = BookIdPayloadSchema.validate(bookId);
    if (validationResult.error) {
      throw new ClientError(validationResult.error.message);
    }
  },
  validateUpdateBookPayload: (payload) => {
    const validationResult = BookPayloadUpdateSchema.validate(payload);
    if (validationResult.error) {
      throw new ClientError(validationResult.error.message);
    }
  },
};

export default BookValidator;
