import Joi from 'joi';
import messages from '../../utils/messages.js';

const BookPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': messages.BOOK.ERROR.INVALID_NAME,
  }),
  year: Joi.number().integer().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().integer().required(),
  readPage: Joi.number().integer().required(),
  reading: Joi.boolean().required(),
});

export default BookPayloadSchema;
