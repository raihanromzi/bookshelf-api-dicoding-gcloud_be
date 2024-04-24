import BookPayloadSchema from './schema.js';

const BookValidator = {
  validateBookPayload: (payload) => {
    const validationResult = BookPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

export default BookValidator;
