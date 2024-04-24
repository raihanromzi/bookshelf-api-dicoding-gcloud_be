import ClientError from '../../exceptions/ClientError.js';
import messages from '../../utils/messages.js';
import { responseSuccess } from '../../utils/responseAPI.js';

class BookHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    this.postBookHandler = this.postBookHandler.bind(this);
  }

  postBookHandler(request, h) {
    try {
      this.validator.validateBookPayload(request.payload);
      const newBook = this.service.addBook(request.payload);
      return h
        .response(
          responseSuccess(
            messages.HTTP.SUCCESS.STATUS.CREATED,
            messages.BOOK.SUCCESS.ADD,
            newBook
          )
        )
        .code(messages.HTTP.SUCCESS.CODE.CREATED);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      return h
        .response({
          status: messages.HTTP.ERROR.STATUS.BAD_REQUEST,
          message: error.message,
        })
        .code(messages.HTTP.ERROR.CODE.BAD_REQUEST);
    }
  }
}

export default BookHandler;
