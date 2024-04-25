import messages from '../../utils/messages.js';
import { responseSuccess } from '../../utils/responseAPI.js';
import logger from '../../logging/logging.js';

class BookHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    this.postBookHandler = this.postBookHandler.bind(this);
    this.getBooksHandler = this.getBooksHandler.bind(this);
    this.getBookByIdHandler = this.getBookByIdHandler.bind(this);
    this.putBookByIdHandler = this.putBookByIdHandler.bind(this);
    this.deleteBookByIdHandler = this.deleteBookByIdHandler.bind(this);
  }

  postBookHandler(request, h) {
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
  }

  getBooksHandler(request, h) {
    const { name, reading, finished } = request.query;
    const booksData = this.service.getBooks({ name, reading, finished });

    return h
      .response(
        responseSuccess(
          messages.HTTP.SUCCESS.STATUS.OK,
          messages.BOOK.SUCCESS.GET,
          { books: booksData }
        )
      )
      .code(messages.HTTP.SUCCESS.CODE.OK);
  }

  getBookByIdHandler(request, h) {
    const { bookId } = request.params;

    this.validator.validateBookId({ bookId });
    const bookData = this.service.getBookById(bookId);

    return h
      .response(
        responseSuccess(messages.HTTP.SUCCESS.STATUS.OK, '', { book: bookData })
      )
      .code(messages.HTTP.SUCCESS.CODE.OK);
  }

  putBookByIdHandler(request, h) {
    const { bookId } = request.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    this.validator.validateBookId({ bookId });
    this.validator.validateUpdateBookPayload({
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    });
    this.service.editBookById(bookId, request.payload);
    return h
      .response(
        responseSuccess(
          messages.HTTP.SUCCESS.STATUS.OK,
          messages.BOOK.SUCCESS.EDIT
        )
      )
      .code(messages.HTTP.SUCCESS.CODE.OK);
  }

  deleteBookByIdHandler(request, h) {
    const { bookId } = request.params;

    this.validator.validateBookId({ bookId });
    this.service.deleteBookById(bookId);
    return h
      .response(
        responseSuccess(
          messages.HTTP.SUCCESS.STATUS.OK,
          messages.BOOK.SUCCESS.DELETE
        )
      )
      .code(messages.HTTP.SUCCESS.CODE.OK);
  }
}

export default BookHandler;
