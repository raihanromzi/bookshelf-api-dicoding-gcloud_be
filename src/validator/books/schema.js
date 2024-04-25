import Joi from 'joi';
import messages from '../../utils/messages.js';

const BookPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': messages.BOOK.ERROR.INVALID_NAME,
  }),
  year: Joi.number().integer().required().messages({
    'any.required': messages.BOOK.ERROR.FAILED_ADD,
  }),
  author: Joi.string().required().messages({
    'any.required': messages.BOOK.ERROR.FAILED_ADD,
  }),
  summary: Joi.string().required().messages({
    'any.required': messages.BOOK.ERROR.FAILED_ADD,
  }),
  publisher: Joi.string().required().messages({
    'any.required': messages.BOOK.ERROR.FAILED_ADD,
  }),
  pageCount: Joi.number().integer().required().messages({
    'any.required': messages.BOOK.ERROR.FAILED_ADD,
  }),
  readPage: Joi.number().integer().required().messages({
    'any.required': messages.BOOK.ERROR.FAILED_ADD,
  }),
  reading: Joi.boolean().required(),
});

const BookIdPayloadSchema = Joi.object({
  bookId: Joi.string().required().messages({
    'any.required': messages.BOOK.ERROR.INVALID_ID,
  }),
});

const BookPayloadUpdateSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': messages.BOOK.ERROR.INVALID_NAME_UPDATE,
  }),
  year: Joi.number().integer(),
  author: Joi.string(),
  summary: Joi.string(),
  publisher: Joi.string(),
  pageCount: Joi.number().integer(),
  readPage: Joi.number().integer(),
  reading: Joi.boolean(),
});

export { BookIdPayloadSchema, BookPayloadSchema, BookPayloadUpdateSchema };
